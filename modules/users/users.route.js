const express = require("express");
const router = express.Router();

const HttpStatus = require('http-status-codes');

const UserService = require('./users.service');
const userService = new UserService();

const EventsService = require('../events/events.service');
const eventsService = new EventsService();

const AssistancesService = require('../assistance/assistance.service');
const assistanceService = new AssistancesService();

router.get('/', async (req, res, next) => {
    res.json(await userService.findAll());
})

router.get('/search',async (req, res, next) => {
    console.log(req.query);
    res.json(await userService.findByKeyword(req.query.s));
})

router.get('/:id', async (req, res, next) => {
    res.json(await userService.find(req.params.id));
})

router.put('/:id', async (req, res, next) => {
    res.json(await userService.update(req.params.id, req.body));
})

router.get('/:id/events', async (req, res, next) => {
    res.json(await eventsService.findForUser(req.params.id));
})

router.get('/:id/events/future', async (req, res, next) => {
    res.json(await eventsService.findFutureEventsForUser(req.params.id));
})

router.get('/:id/events/finished', async (req, res, next) => {
    res.json(await eventsService.findFinishedEventsForUser(req.params.id));
})

router.get('/:id/events/current', async (req, res, next) => {
    res.json(await eventsService.findCurrentEventsForUser(req.params.id));
})

router.get('/:id/assistances', async (req, res, next) => {
    res.json(await eventsService.findEventsWithAssistanceOfUser(req.USER_ID));
})

router.get('/:id/assistances/future', async (req, res, next) => {
    res.json(await eventsService.findFutureEventsWithAssistanceOfUser(req.USER_ID));
})

router.get('/:id/assistances/finished', async (req, res, next) => {
    res.json(await eventsService.findFinishedEventsWithAssistanceOfUser(req.USER_ID));
})

router.delete('/', async (req, res, next) => {
    await userService.remove(req.USER_ID);
    res.json().status(HttpStatus.NO_CONTENT);
})

module.exports = router;
