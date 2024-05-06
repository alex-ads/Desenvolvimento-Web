const express = require('express'); // Importa o framework Express
const router = express.Router(); // Cria um novo roteador do Express
const { insert, findAll, findById, update, remove } = require("../db/peopleQueries"); // Importa funções relacionadas ao banco de dados
const rescue = require('express-rescue'); // Importa o middleware express-rescue

// Rota para criar uma nova pessoa
router.post("/", async (req, res) => {
  const person = req.body;
  const [result] = await insert(person);
  
  return res.status(201).json({ message: `Pessoa cadastrada com o id ${result.insertId}`});
})

// Rota para listar todas as pessoas
router.get("/", rescue(async (req, res) => {
  const [result] = await findAll();
  return res.status(200).json(result);
}));

// Rota para buscar uma pessoa pelo ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const [[result]] = await findById(id)

  if (!result) {
    return res.status(404).json({ message: "Pessoa não encontrada!"})
  }

  return res.status(200).json(result)
})

// Rota para atualizar uma pessoa pelo ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const person = req.body;
  const [result] = await update(id, person);

  if (result.affectedRows === 0) {
    return res.status(400).json({ message: "Nenhuma alteração realizada. Tente com outros dados"})
  }

  return res.status(200).json({ message: `Pessoa com o id ${id} atualizada com sucesso!`});
})

// Rota para deletar uma pessoa pelo ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const [result] = await remove(id);

  if (result.affectedRows === 0) {
    return res.status(400).json({ message: "Nenhuma alteração realizada. Tente com outros dados"})
  }

  return res.status(200).json({ message: `Pessoa com o id ${id} foi deletada com sucesso!`});
})

module.exports = router;
