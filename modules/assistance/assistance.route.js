const express = require("express");
const router = express.Router();

const HttpStatus = require('http-status-codes');

const AssistanceService = require('./assistance.service');
const assistanceService = new AssistanceService();

router.get('/', async (req, res, next) => {
    res.json(await assistanceService.findAll());
})

module.exports = router;
