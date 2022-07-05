require('dotenv').config();
const connection = require('../helpers/connection');

const DATABASE = process.env.MYSQL_DATABASE;

const getAll = async () => {
  const query = `SELECT * FROM ${DATABASE}.products;`;

  const [result] = await connection.execute(query);

  return result.length ? result : null;
};

const findForId = async (id) => {
  const query = `SELECT * FROM ${DATABASE}.products WHERE id=?;`;

  const [result] = await connection.execute(query, [id]);

  return result.length ? result[0] : null;
};

const newProduct = async (nameProduct) => {
  const query = `INSERT INTO ${DATABASE}.products (name) VALUES (?);`;

  const [result] = await connection.execute(query, [nameProduct]);

  return { id: result.insertId, name: nameProduct };
};

const newSales = async (arraySales) => {
  const querySales = `INSERT INTO ${DATABASE}.sales (date) VALUES (NOW ());`;
  const idSale = await connection.execute(querySales).then(([id]) => id.insertId);

  const querySalesProduct = `
  INSERT INTO ${DATABASE}.sales_products (sale_id, product_id, quantity) VALUES (?,?,?);`;

  arraySales.forEach(async (objeto) => {
    await connection
      .execute(querySalesProduct, [idSale, objeto.productId, objeto.quantity]);
  });

  return {
    id: idSale,
    itemsSold: arraySales,
  };
};

module.exports = {
  getAll,
  findForId,
  newProduct,
  newSales,
};
