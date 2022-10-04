const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
let visitas = 0;

app.get('/visitas', (req, res) => {
  console.log(req.connection.remoteAdress);
  visitas++;
  res.send(`La cantidad de visitas es ${visitas}`);
});

app.get('/productos', (req, res) => {
  console.log(req.connection.remoteAdress);
  visitas++;
  res.send(`La cantidad de visitas es ${visitas}`);
});

app.get('/productoRandom', (req, res) => {
  console.log(req.connection.remoteAdress);
  visitas++;
  res.send(`La cantidad de visitas es ${visitas}`);
});

app.all('*', (req, res) => res.send('Ruta no valida'));

const server = app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

server.on('error', err => console.log(`Error on server ${err}`));