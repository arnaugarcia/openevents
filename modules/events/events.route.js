const express = require("express");
const router = express.Router();

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

module.exports = router;
