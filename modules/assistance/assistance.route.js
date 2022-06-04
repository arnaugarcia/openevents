const express = require("express");
const router = express.Router();

const HttpStatus = require('http-status-codes');

const AssistanceService = require('./assistance.service');
const assistanceService = new AssistanceService();

router.get('/:userId/:eventId', async (req, res, next) => {
    res.json(await assistanceService.findAssistancesForEventAndUser(req.params.eventId, req.params.userId));
})

router.post('/:userId/:eventId', async (req, res, next) => {
    res.status(HttpStatus.CREATED).json(await assistanceService.saveAssistanceForUserAndEvent(req.params.userId, req.params.eventId, req.body));
})

router.put('/:userId/:eventId', async (req, res, next) => {
    res.json(await assistanceService.saveAssistanceForUserAndEvent(req.params.userId, req.params.eventId, req.body));
})

router.delete('/:userId/:eventId', async (req, res, next) => {
    res.status(HttpStatus.NO_CONTENT).json(await assistanceService.removeAssistanceForUserAndEvent(req.params.eventId, req.params.userId));
})


module.exports = router;
