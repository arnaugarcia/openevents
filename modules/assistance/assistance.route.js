const express = require("express");
const router = express.Router();

const HttpStatus = require('http-status-codes');

const AssistanceService = require('./assistance.service');
const assistanceService = new AssistanceService();

router.get('/:userId/:eventId', async (req, res, next) => {
    res.json(await assistanceService.findAssistancesForEventAndUser(req.params.eventId, req.params.userId));
})

module.exports = router;
