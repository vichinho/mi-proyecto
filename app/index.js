const express = require('express');
const { Client } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

async function connectWithRetry(retries = 10, delay = 3000) {
  for (let i = 1; i <= retries; i++) {
    try {
      await client.connect();
      return;
    } catch (error) {
      console.log(`Intento ${i} falló: ${error.message}`);
      if (i === retries) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

app.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT NOW()');
    res.send(`Conexión exitosa a PostgreSQL: ${result.rows[0].now}`);
  } catch (error) {
    res.status(500).send(`Error conectando a la base de datos: ${error.message}`);
  }
});

connectWithRetry()
  .then(() => console.log('Conectado a PostgreSQL'))
  .catch(err => console.error('No se pudo conectar:', err.message));

app.listen(port, () => {
  console.log(`App corriendo en puerto ${port}`);
});