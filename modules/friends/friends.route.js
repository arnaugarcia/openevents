const express = require("express");
const router = express.Router();

const HttpStatus = require('http-status-codes');

const FriendsService = require('./friends.service');
const friendsService = new FriendsService();

router.get('/', async (req, res, next) => {
    res.json(await friendsService.findFriendsForUser(req.USER_ID));
})

router.get('/requests', async (req, res, next) => {
    res.json(await friendsService.findFriendRequestsForUser(req.USER_ID));
})

module.exports = router;
