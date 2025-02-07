const express = require('express');
const fs = require('fs');
const https = require('https');
const http = require('http');
const app = express();
app.use(express.json());
const {getMessages, addMessage} = require('./database.js');
const path = require('path');

const APIKEY = "123456";

app.get('/', (req, res) => {
  res.send('Bienvenido al despliegue del servidor de Lucas!');
})

app.get('/message', (req, res) => {    
   // Devolver mensajes alamacenados en la BBDD
   const apikey = req.headers['apikey'];
   if (apikey !== APIKEY){
     return res.status(401).send('Unauthorized');
    }else if (apikey === APIKEY){
      res.json(getMessages());
      return res.status(200).send('OK');  
   }
})

app.post('/message', (req, res) => {    
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
})

if(process.env.NODE_ENV === 'production'){
 
  const options = {
    key: fs.readFileSync(path.join(__dirname, 'privkey.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'fullchain.pem'))
  };
  
  
  //create an http server
  https.createServer(options, app).listen(3000, () => {
    console.log('Servidor corriendo en https://dev5.cyberbunny.online:3000');
  })
} else {
  http.createServer(app).listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
  })
}

;
/*
app.listen(3000, () => {    
    console.log('Servidor corriendo en http://localhost:3000');
})
    */