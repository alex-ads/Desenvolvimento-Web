// Importa o módulo de conexão com o banco de dados
const connection = require('./connection');

// Função para inserir uma nova pessoa no banco de dados
const insert = (person) => connection.execute(`
  INSERT INTO people (first_name, last_name, email, phone)
  VALUES (?, ?, ?, ?);
`, [person.firstName, person.lastName, person.email, person.phone]);

// Função para buscar todas as pessoas no banco de dados
const findAll = () => connection.execute(`
  SELECT * FROM people LIMIT 1
`);

// Função para buscar uma pessoa pelo seu ID no banco de dados
const findById = (id) => connection.execute(`
  SELECT * FROM people WHERE id = ?
`, [id]);

// Função para atualizar os dados de uma pessoa no banco de dados
const update = (id, person) => connection.execute(`
  UPDATE people
  SET first_name = ?, last_name = ?, email = ?, phone = ?
  WHERE id = ?
`, [person.firstName, person.lastName, person.email, person.phone, id]);

// Função para remover uma pessoa do banco de dados
const remove = (id) => connection.execute(`
  DELETE FROM people where id = ?
`, [id]);

// Exporta todas as funções para serem utilizadas em outros arquivos
module.exports = {
  insert,
  findAll,
  findById,
  update,
  remove,
};
