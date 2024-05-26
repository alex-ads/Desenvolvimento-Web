// Importa o framework Express
const express = require("express");

// Importa as rotas relacionadas a peoples
const peopleRoute = require("./routes/peopleRoutes");
// Importa as rotas relacionadas a transactionRoute
const transactionRoute = require("./routes/transactionRoutes");
// Importa o módulo 'express-async-errors' para tratar erros assíncronos automaticamente
require("express-async-errors");

// Cria uma instância do aplicativo Express
const app = express();

// Middleware para fazer o parsing do corpo das requisições como JSON
app.use(express.json());

// Rota para lidar com requisições GET na raiz do servidor
app.get("/", (req, res) => {
  return res.status(400).json({ message: "Olá"})
})

// Middleware para direcionar requisições relacionadas às pessoas para o respectivo roteador
app.use("/people", peopleRoute);

// Middleware para direcionar requisições relacionadas às pessoas para o respectivo roteador
app.use("/transaction", transactionRoute);


// Middleware para tratar erros. Quando um erro ocorre em qualquer lugar da aplicação,
// ele é direcionado para este middleware, que então loga o erro e retorna uma resposta JSON
// com status 500 (Internal Server Error) e uma mensagem de erro
app.use((error, req, res, next) => {
  console.log('oi')
  return res.status(500).json({ error: error.message })
})

// Exporta o aplicativo Express para ser utilizado em outros arquivos
module.exports = app;
