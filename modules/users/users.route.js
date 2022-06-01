const express = require("express");
const router = express.Router();

const HttpStatus = require('http-status-codes');

const UserService = require('./users.service');
const userService = new UserService();

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

router.delete('/:id', async (req, res, next) => {
    res.json(await userService.remove(req.params.id)).status(HttpStatus.NO_CONTENT);
})

module.exports = router;
