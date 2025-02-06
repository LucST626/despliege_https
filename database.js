const sqlite3 = require('sqlite3').verbose();

// Conectar a la base de datos SQLite (si no existe, se creará automáticamente)
const db = new sqlite3.Database('./messages.db', (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos SQLite:', err);
  } else {
    console.log('Conexión exitosa a la base de datos SQLite');
  }
});

// Crear la tabla messages si no existe (esto es equivalente al CREATE TABLE en MySQL)
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      message TEXT NOT NULL,
      user TEXT DEFAULT 'anonimo'
    )
  `);
});

// Función para obtener los mensajes
function getMessages() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM messages', (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

// Función para guardar un nuevo mensaje
function postMessage(message, user = 'anonimo') {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare('INSERT INTO messages (message, user) VALUES (?, ?)');
    stmt.run(message, user, function(err) {
      if (err) {
        return reject(err);
      }
      resolve(this.lastID); // Devuelve el ID del mensaje insertado
    });
    stmt.finalize();
  });
}

module.exports = { getMessages, postMessage };
