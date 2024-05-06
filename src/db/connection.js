// Importa o módulo mysql2/promise para criar conexões com o MySQL
const mysql = require('mysql2/promise');
// Importa e configura o módulo dotenv para carregar variáveis de ambiente a partir de um arquivo .env
require("dotenv").config();

// Cria uma conexão com o banco de dados MySQL usando o método createPool do módulo mysql2/promise
// e atribui a uma variável chamada connection
// Obtém dados do banco de dados a partir de variáveis de ambiente
const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DB
});

// Exporta a conexão para que possa ser utilizada em outros módulos
module.exports = connection;
