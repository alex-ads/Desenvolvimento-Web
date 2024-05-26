const connection = require('./connection');

const insertTransaction = (transaction) => connection.execute(`
  INSERT INTO transactions (name, description, price, type, person_id)
  VALUES (?, ?, ?, ?, ?);
`, [transaction.name, transaction.description, transaction.price, transaction.type, transaction.person_id]);

const findAllTransactions = () => connection.execute(`
  SELECT * FROM transactions;
`);

const findTransactionById = (id) => connection.execute(`
  SELECT * FROM transactions WHERE id = ?
`, [id]);

const updateTransaction = (id, transaction) => connection.execute(`
  UPDATE transactions
  SET name = ?, description = ?, price = ?, type = ?, person_id = ?
  WHERE id = ?
`, [transaction.name, transaction.description, transaction.price, transaction.type, transaction.person_id, id]);

const deleteTransaction = (id) => connection.execute(`
  DELETE FROM transactions where id = ?
`, [id]);

module.exports = {
  insertTransaction,
  findAllTransactions,
  findTransactionById,
  updateTransaction,
  deleteTransaction,
};
