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

router.get('/search', async (req, res, next) => {
    res.json(await eventsService.search(req.query));
})

router.get('/:id', async (req, res, next) => {
    res.json(await eventsService.find(req.params.id));
})

router.put('/:id', async (req, res, next) => {
    res.json(await eventsService.update(req.params.id, req.body));
})

router.delete('/:id', async (req, res, next) => {
    await eventsService.remove(req.params.id)
    res.status(HttpStatus.NO_CONTENT).json({Mensaje: `${req.params.id} has been deleted`});
})

module.exports = router;
