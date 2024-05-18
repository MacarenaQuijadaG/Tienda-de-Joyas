const express = require('express')
const joyas = require('./data/joyas.js')
const app = express()
app.listen(3000, () => console.log('Your app listening on port 3000'))
/*
app.get('/', (req, res) => {
  res.send('Oh wow! this is working =)')
})
*/
// Ruta principal donde se muestra el listado de joyas
app.get('/', (req, res) => {
  console.log("Lista de joyas: ", joyas)
  res.send(joyas)
})

const orderValues = (order, filtradas) => {
  console.log(order);

  return order == "asc"
    ? filtradas.sort((a, b) => a.value - b.value)
    : order == "desc"
      ? filtradas.sort((a, b) => b.value - a.value)
      : false;
};
const filtroByBody = (metal, categoria) => {
  console.log(joyas.results);
  return joyas.results.filter((g) => g.metal === metal || g.category === categoria);
};

// Ruta GET /joyas que devuelve la estructura HATEOAS de todas las joyas almacenadas en la base de datos
app.get("/joyas", (req, res) => {
  const metal = req.query.metal;
  const categoria = req.query.categoria;
  const values = req.query.values;
  let filtradas = filtroByBody(metal, categoria);

  if (values == "asc" || values == "desc") {
    filtradas = orderValues(values, filtradas);
    console.log("Valor de filtradas después de ordenar: ", filtradas);
  }

  res.send({
    cantidad: filtradas.length,
    joyas: filtradas
  });

});


// Ruta GET /joyas/categoria/:categoria que devuelve solo las joyas correspondientes a la categoría obtenida
// http://localhost:3000/joyas/categoria/aros
app.get('/joyas/categoria/:categoria', (req, res) => {
  const { categoria } = req.params;
  const joyasCategoria = joyas.results.filter(joya => joya.category === categoria);

  if (joyasCategoria.length > 0) {
    res.send({
      cantidad: joyasCategoria.length,
      joyas: joyasCategoria
    });
  } else {
    res.status(404).send({
      mensaje: "Error 404. Categoría no encontrada"
    });
  }
});

// Ruta GET /joyas que permite el filtrado por campos de las joyas
// Ruta GET para el ordenamiento de las joyas según su valor de forma ascendente o descendente usando Query Strings

app.get("/joyas/:id", (req, res) => {

  let { id } = req.params;
  id = Number(id)

  console.log("1. Valor parametro id recibido en ruta: ", id);
  const joyaObtenida = joya(id);
if (joyaObtenida == undefined) {
  res.send({
    joya: joyaObtenida,
    mensaje: "Error 404. Joya no hallada"
  });
} else {
  res.send({
    joya: joyaObtenida,
    mensaje: "Joya encontrada"
  });
}
});

