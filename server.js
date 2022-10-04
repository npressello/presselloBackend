const Contenedor = require('./Contenedor.js');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
let visitas = 0;

const server = app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

server.on('error', err => console.log(`Error on server ${err}`));

const productos = new Contenedor('productos.txt');

app.get('/visitas', (req, res) => {
  console.log(req.ip);
  visitas++;
  res.send(`La cantidad de visitas es ${visitas}`);
});

app.get('/productos', async (req, res) => {
  console.log(req.ip);
  const todosLosProductos = await productos.getAll();
  res.send(todosLosProductos);
});

app.get('/productoRandom', async (req, res) => {
  console.log(req.connection.remoteAdress);
  const todosLosProductos = await productos.getAll();
  const rand = Math.floor(Math.random() * todosLosProductos.length);
  res.send(todosLosProductos[rand]);
});

app.all('*', (req, res) => res.send('Ruta no valida'));

