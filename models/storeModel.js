const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products;';

  const [result] = await connection.execute(query);

  return result.length ? result : null;
};

const findForId = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id=?;';

  const [result] = await connection.execute(query, [id]);

  return result.length ? result[0] : null;
};

const newProduct = async (nameProduct) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?);';

  const [result] = await connection.execute(query, [nameProduct]);

  return { id: result.insertId, name: nameProduct };
};

const newSales = async (arraySales) => {
  const querySales = 'INSERT INTO StoreManager.sales (date) VALUES (NOW ());';
  const idSale = await connection.execute(querySales).then(([id]) => id.insertId);

  const querySalesProduct = `
  INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?,?,?);`;

  arraySales.forEach(async (objeto) => {
    await connection
      .execute(querySalesProduct, [idSale, objeto.productId, objeto.quantity]);
  });

  return {
    id: idSale,
    itemsSold: arraySales,
  };
};

const updateProduct = async (id, name) => {
  const query = `
  UPDATE StoreManager.products SET name=? WHERE id=?;`;

  await connection.execute(query, [name, id]);

  return findForId(id);
};

module.exports = {
  getAll,
  findForId,
  newProduct,
  newSales,
  updateProduct,
};
