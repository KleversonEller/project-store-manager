require('dotenv').config();
const connection = require('../helpers/connection');

const DATABASE = process.env.MYSQL_DATABASE;

const getAll = async () => {
  const query = `SELECT * FROM ${DATABASE}.products;`;

  const [result] = await connection.execute(query);

  return result.length < 0 ? null : result;
};

const findForId = async (id) => {
  const query = `SELECT * FROM ${DATABASE}.products WHERE id=?;`;

  const [result] = await connection.execute(query, [id]);

  return result.length < 0 ? null : result[0];
}

module.exports = {
  getAll,
  findForId,
};
