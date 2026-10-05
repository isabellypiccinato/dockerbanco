const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

const pool = mysql.createPool({
  host: '127.0.0.1',
  port: 3307,
  user: 'root',
  password: 'my-secret-pw',
  database: 'meubanco',
});

app.get('/usuarios', async (req, res) => {
  try {
    const [linhas] = await pool.query(
      'SELECT idUsuario, nomeUsuario FROM tbUsuario'
    );
    res.json(linhas);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao consultar o banco' });
  }
});



app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});