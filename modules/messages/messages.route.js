const express = require("express");
const router = express.Router();

const HttpStatus = require('http-status-codes');

const MessageService = require('./messages.service');
const messagesService = new MessageService();

router.get('/:id', async (req, res, next) => {
    res.json(await messagesService.find(req.params.id));
})

router.post('/', async (req, res, next) => {
    res.json(await messagesService.saveMessageForUser(req.body));
})

module.exports = router;
