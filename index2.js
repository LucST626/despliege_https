const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors'); // Requiere la librería cors

const app = express();
app.use(express.json());
app.use(cors()); // Usa cors en tu aplicación

const { getMessages, addMessage } = require('./database.js');

const APIKEY = "123456";

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Bienvenido al despliegue del servidor de Lucas!');
});

app.get('/messages', (req, res) => {
  // Devolver mensajes alamacenados en la BBDD
  const apikey = req.headers['apikey'];
if (apikey === APIKEY) {
    res.json(getMessages());
    return res.status(200).send('OK');
  }
});

app.post('/messages', (req, res) => {
  // Guardar mensajes en la BBDD
  const apikey = req.headers['apikey'];
  if (apikey !== APIKEY) {
    return res.status(401).send('Unauthorized');
  }

  // Manda el mensaje por la query y lo añadade a la BBDD
  const message = req.body.message;
  if (message) {
    addMessage(message);
    res.status(201).send('Message added');
  } else {
    res.status(400).send('Bad Request');
  }
});

// Iniciar el servidor en localhost
http.createServer(app).listen(3000, '0.0.0.0', () => {
  console.log('Servidor corriendo en http://172.233.98.154:3000');
});