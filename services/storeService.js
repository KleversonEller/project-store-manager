const Joi = require('joi');
const storeModel = require('../models/storeModel');

const getAll = async () => {
  const result = await storeModel.getAll();

  return result;
};

const findForId = async (id) => {
  if (!id) return null;

  const result = await storeModel.findForId(id);

  if (!result) return { error: { code: 'notFound', message: 'Product not found' } };

  return result;
};

const newProduct = async (nameProduct) => {
  const result = await storeModel.newProduct(nameProduct);

  return result;
};

const schema = (lista) => {
  const error = Joi.object({
    productId: Joi.number().required(),
    quantity: Joi.number().required().min(1),
  }).validate(lista);

  if (error.error) return error;
  return lista;
};

const valid = async (valor) => {
    const result = await Promise.all(valor.map(async (objeto) => {
    const test = schema(objeto);
    if (test.error) return test;
    const response = objeto.productId && await storeModel.findForId(objeto.productId);
    if (!response) return null;

    return objeto;
    }));

  return result;
};

const newSales = async (arraySales) => {
  const result = await valid(arraySales);

  if (result.includes(null)) return [{ error: { code: 'notFound', message: 'Product not found' } }];

  if (result[0].error) return result;

  const test = await storeModel.newSales(result);

  return [test];
};

const updateProduct = async (id, name) => {
  const validId = await findForId(id);

  if (validId.error) return validId;

  const result = await storeModel.updateProduct(id, name);

  return result;
};

module.exports = {
  getAll,
  findForId,
  newProduct,
  newSales,
  updateProduct,
};