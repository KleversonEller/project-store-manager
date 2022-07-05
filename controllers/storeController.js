const storeService = require('../services/storeService');
const Joi = require('joi');
const rescue = require('express-rescue');

const getAll = rescue(async (_req, res, next) => {
  const result = await storeService.getAll();

  if (!result) return next(error);

  return res.status(200).json(result);
});

const findForId = rescue(async (req, res, next) => {
  const { id } = req.params;
  const result = await storeService.findForId(id);

  if (result.error) return next(result.error);

  return res.status(200).json(result);
});

module.exports = {
  getAll,
  findForId,
};
