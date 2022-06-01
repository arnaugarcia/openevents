const express = require("express");
const router = express.Router();

const HttpStatus = require('http-status-codes');

const EventsService = require('./events.service');
const eventsService = new EventsService();

router.get('/', async (req, res, next) => {
    res.json(await eventsService.findAll());
})

router.post('/', async (req, res, next) => {
    res.json(await eventsService.saveForUser(req.USER_ID, req.body));
})

module.exports = router;
