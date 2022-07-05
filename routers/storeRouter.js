const router = require('express').Router();
const express = require('express');
const storeController = require('../controllers/storeController')

router.use(express.json());

router.get('/', storeController.getAll);
router.get('/:id', storeController.findForId);

module.exports = router;