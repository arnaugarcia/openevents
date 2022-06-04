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

router.post('/:id', async (req, res, next) => {
    res.json(await friendsService.saveFriendRequestForUserAndFriend(req.USER_ID, req.params.id));
})

router.put('/:id', async (req, res, next) => {
    res.json(await friendsService.acceptFriendRequestForUserAndFriend(req.USER_ID, req.params.id));
})

router.delete('/:id', async (req, res, next) => {
    res.json(await friendsService.rejectFriendRequestForUserAndFriend(req.USER_ID, req.params.id));
})

module.exports = router;
