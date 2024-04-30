const express = require('express')
const data = require('../data/data.json')
const db = require('./db/models')
const _ = require('lodash');
const { where } = require('sequelize');
const alquilable = require('./db/models/alquilable');
const app = express();
app.use(express.json())

app.get('/alquilable', async (req, res)=>{
  const alquilables = await db.alquilable.findAll({});
  res.status(200).json(alquilables)
})

app.get('/alquilable/:id', async (req, res)=>{
  const id = req.params.id;
  const alquilable = await db.alquilable.findOne(
    {
      where: {id},
      attributes: ['id', 'descripcion', 'disponible', 'precio']
    }
  );
  res.status(200).json(alquilable)
})

app.delete('/alquilable/:id', async (req, res)=>{
   const id = req.params.id;
   const row = await db.alquilable.destroy({where: {id}})
   if(row){
    res.status(200).json(`El alquilable con ${id} no se borro con existo.`)
   }else{
    res.status(404).json(`El alquilable con ${id} no existe.`)
   }
})

app.post('/alquilable', async (req, res)=>{
    try{
      const alquilable = req.body
      const newRecord = await db.alquilable.create(alquilable)
      res.status(201).json(newRecord)
    }catch(err){
      res.status(500).json(err.message)
    }
    

})

app.put('/alquilable/:id', (req, res)=>{
  const id = req.params.id;
  const idx = data.findIndex( e => e.id == id)
  if (idx >=0) {
    data[idx] = {id: Number(id), ...req.body}
    res.status(200).json(data[idx])
  } else
    res.status(404).json({error: `El id ${id} no existe.`})
})


app.listen(3000, async ()=>{
  console.log(`La aplicacion arranco correctamente en el puerto 3000`);
  try{
    await db.sequelize.authenticate()
    await db.sequelize.sync({force:true});
    db.alquilable.create({
      descripcion: "Castillo Infable",
      disponible: true,
      precio: 1200,
    })
    db.alquilable.create({
      descripcion: "Toro mecanico",
      disponible: true,
      precio: 1300,
    })
  }catch(err){
    console.log(err)
  }
})