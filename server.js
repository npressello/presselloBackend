const Contenedor = require('./Contenedor.js');
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

server.on('error', err => console.log(`Error on server ${err}`));

const productos = new Contenedor('productos.txt');

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

//app.all('*', (req, res) => res.send('Ruta no valida'));


// EJERCICIOS BASICOS

app.get('/api/sumar/:num1/:num2', (req, res) => {
  let { num1, num2 } = req.params;
  res.send({ suma: parseInt(num1) + parseInt(num2) });
});


app.get('/api/sumar', (req, res) => {
  let { num1, num2 } = req.query;
  res.send({ suma: parseInt(num1) + parseInt(num2) });
});

app.get('/api/operacion/:nums', (req, res) => {
  let result = eval(req.params.nums);
  res.send({ suma: result });
});

let frase = "Hola mundo como estan";

app.post('/api/mensajes', (req, res) => {
  console.log('POST request recibido');

  console.log(req.body);
  res.send("OK");
});

app.put('/api/mensajes-json/:id', (req, res) => {
  console.log('PUT request recibido');

  res.json({
    result: 'ok',
    id: req.params.id,
    nuevo: req.body
  });
});

// Ultimo ejercicio 7

app.get('/api/frase', (req, res) => {
  res.json({ frase: frase });
})

app.get('/api/letras/:num', (req, res) => {
  res.json({ letra: (frase.charAt(parseInt(req.params.num)) || "El parámetro no es un número valido") });
})

app.get('/api/palabras/:pos', (req, res) => {
  const arrFrase = frase.split(" ")
  const pos = parseInt(req.params.pos) - 1 || -1;
  if (pos < 0 || pos > arrFrase.length) {
    res.json({ error: "palabra no encontrada" });
    return;
  }
  res.json({ palabra: arrFrase[pos] });
})

app.post('/api/palabras', (req, res) => {
  frase = frase + " " + req.body.palabra;
  pos = frase.split(" ").length;
  res.json({ agregada: req.body.palabra, pos: pos });
})

app.put('/api/palabras/:pos', (req, res) => {
  let arrFrase = frase.split(" ");
  const pos = parseInt(req.params.pos) - 1 || -1;
  if (pos < 0 || pos > arrFrase.length) {
    res.json({ error: "posicion incorrecta" });
    return;
  }
  let anterior = arrFrase[pos];
  arrFrase[pos] = req.body.palabra;
  frase = arrFrase.join(" ");
  res.json({ actualizada: arrFrase[pos], anterior: anterior });
})

app.delete('/api/palabras/:pos', (req, res) => {
  let arrFrase = frase.split(" ");
  const pos = parseInt(req.params.pos) - 1 || -1;
  if (pos < 0 || pos > arrFrase.length) {
    res.send({ error: "posicion incorrecta" });
    return;
  }

  arrFrase = arrFrase.filter((e, ix) => ix != pos);
  frase = arrFrase.join(" ");
  res.json({ palabra: "Se elimino palabra" })
})