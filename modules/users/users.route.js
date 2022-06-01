const express = require("express");
const router = express.Router();

const HttpStatus = require('http-status-codes');

const UserService = require('./users.service');
const userService = new UserService();

const EventsService = require('../events/events.service');
const eventsService = new EventsService();

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

router.delete('/', async (req, res, next) => {
    await userService.remove(req.USER_ID);
    res.json().status(HttpStatus.NO_CONTENT);
})

module.exports = router;
