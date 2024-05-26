const express = require('express');
const router = express.Router();
const { insertTransaction, findAllTransactions, findTransactionById, updateTransaction, deleteTransaction } = require("../db/transactionQueries");
const rescue = require('express-rescue');
const { findById } = require("../db/peopleQueries");
const validateTransaction = require("../db/middlewares/transactionMiddlewares")

// Rota para criar uma nova transação
router.post("/", validateTransaction, async (req, res) => {
  const transaction = req.body;

  try {
    // Verifica se o person_id da transação existe na tabela people
    const [person] = await findById(transaction.person_id);

    if (!person) {
      return res.status(400).json({ message: "ID da pessoa não encontrado. Não é possível criar a transação." });
    }

    const [result] = await insertTransaction(transaction);

    return res.status(201).json({ message: `Transação cadastrada com o id ${result.insertId}` });
  } catch (error) {
    console.error("Erro ao criar transação:", error);
    return res.status(500).json({ message: "Erro ao criar transação. Por favor, tente novamente mais tarde." });
  }
});


// Rota para listar todas as transações
router.get("/", rescue(async (req, res) => {
  const [result] = await findAllTransactions();
  return res.status(200).json(result);
}));

// Rota para buscar uma transação pelo ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const [[result]] = await findTransactionById(id)

  if (!result) {
    return res.status(404).json({ message: "Transação não encontrada!"})
  }

  return res.status(200).json(result)
})

// Rota para atualizar uma transação pelo ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const transaction = req.body;
  const [result] = await updateTransaction(id, transaction);

  if (result.affectedRows === 0) {
    return res.status(400).json({ message: "Nenhuma alteração realizada. Tente com outros dados"})
  }

  return res.status(200).json({ message: `Transação com o id ${id} atualizada com sucesso!`});
})

// Rota para deletar uma transação pelo ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const [result] = await deleteTransaction(id);

  if (result.affectedRows === 0) {
    return res.status(400).json({ message: "Nenhuma alteração realizada. Tente com outros dados"})
  }

  return res.status(200).json({ message: `Transação com o id ${id} foi deletada com sucesso!`});
})

module.exports = router;
