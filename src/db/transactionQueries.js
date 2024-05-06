// Importa o módulo de conexão com o banco de dados
const connection = require('./connection');

// Função para inserir uma nova transação no banco de dados
const insertTransaction = (transaction) => connection.execute(`
  INSERT INTO transactions (name, description, price, type, person_id)
  VALUES (?, ?, ?, ?, ?);
`, [transaction.name, transaction.description, transaction.price, transaction.type, transaction.person_id]);

// Função para buscar todas as transações no banco de dados
const findAllTransactions = () => connection.execute(`
  SELECT * FROM transactions;
`);

// Função para buscar uma transação pelo seu ID no banco de dados
const findTransactionById = (id) => connection.execute(`
  SELECT * FROM transactions WHERE id = ?
`, [id]);

// Função para atualizar os dados de uma transação no banco de dados
const updateTransaction = (id, transaction) => connection.execute(`
  UPDATE transactions
  SET name = ?, description = ?, price = ?, type = ?, person_id = ?
  WHERE id = ?
`, [transaction.name, transaction.description, transaction.price, transaction.type, transaction.person_id, id]);

// Função para remover uma transação do banco de dados
const deleteTransaction = (id) => connection.execute(`
  DELETE FROM transactions where id = ?
`, [id]);

// Exporta todas as funções para serem utilizadas em outros arquivos
module.exports = {
  insertTransaction,
  findAllTransactions,
  findTransactionById,
  updateTransaction,
  deleteTransaction,
};
