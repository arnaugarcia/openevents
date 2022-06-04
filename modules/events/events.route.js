const express = require("express");
const router = express.Router();

const HttpStatus = require('http-status-codes');

const EventsService = require('./events.service');
const eventsService = new EventsService();

const AssistanceService = require('../assistance/assistance.service');
const assistanceService = new AssistanceService();

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

router.post('/:id/assistances', async (req, res, next) => {
    const result = await assistanceService.saveAssistanceForUser(req.params.id, req.USER_ID);
    if (result) {
        res.status(HttpStatus.CREATED).json(result);
    } else {
        res.status(HttpStatus.NOT_FOUND).json();
    }
})

router.get('/:id/assistances', async (req, res, next) => {
    res.json(await assistanceService.findAssistancesForEvent(req.params.id));
})

router.delete('/:id', async (req, res, next) => {
    await eventsService.remove(req.params.id)
    res.status(HttpStatus.NO_CONTENT).json({Mensaje: `${req.params.id} has been deleted`});
})

module.exports = router;
