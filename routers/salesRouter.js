const router = require('express').Router();
const express = require('express');
const storeController = require('../controllers/storeController');

router.use(express.json());

router.post('/', storeController.newSales);

module.exports = router;