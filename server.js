const express = require('express');
const bodyParser = require('body-parser');
const { getMessages, postMessage } = require('./database');
const app = express();

// Middleware
app.use(bodyParser.json());

// API Key (Hardcodeada)
const API_KEY = 'mi-api-key-secreta';

// Función para validar el API key
function validateApiKey(req, res, next) {
  const apiKey = req.headers['apikey'];
  console.log('API Key recibida:', apiKey); // Depuración: Ver qué API Key llega
  if (apiKey !== API_KEY) {
    return res.status(403).json({ error: 'API key inválida' });
  }
  next();
}

// Endpoint GET para obtener mensajes
app.get('/messages', validateApiKey, async (req, res) => {
  try {
    const messages = await getMessages();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los mensajes' });
  }
});

// Endpoint POST para agregar un mensaje
app.post('/messages', validateApiKey, async (req, res) => {
  const { message, user } = req.query;

  if (!message) {
    return res.status(400).json({ error: 'El mensaje es requerido' });
  }

  try {
    await postMessage(message, user);
    res.status(201).json({ success: 'Mensaje agregado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el mensaje' });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
