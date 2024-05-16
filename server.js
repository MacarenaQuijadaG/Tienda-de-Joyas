const express = require('express')
const joyas = require('./data/joyas.js')
const app = express()
app.listen(3000, () => console.log('Your app listening on port 3000'))

app.get('/', (req, res) => {
  res.send('Oh wow! this is working =)')
})


// Ruta GET /joyas que devuelve la estructura HATEOAS de todas las joyas almacenadas en la base de datos


// Ruta GET /joyas/categoria/:categoria que devuelve solo las joyas correspondientes a la categoría obtenida


// Ruta GET /joyas que permite el filtrado por campos de las joyas


// Ruta GET para el ordenamiento de las joyas según su valor de forma ascendente o descendente usando Query Strings

