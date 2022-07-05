const storeModel = require('../models/storeModel');

const getAll = async () => {
  const result = await storeModel.getAll();

  return result;
};

const findForId = async (id) => {
  const result = await storeModel.findForId(id);

  if (!result) return { error: { code: "notFound", message: "Product not found" } };

  return result;
};

const newProduct = async (nameProduct) => {
  const result = await storeModel.newProduct(nameProduct);

  return result;
}

module.exports = {
  getAll,
  findForId,
  newProduct,
};