const express = require("express");
const router = express.Router();

const UserService = require('./users.service');
const userService = new UserService();

router.get('/', async (req, res, next) => {
    res.json(await userService.findAll());
})

router.get('/:id', async (req, res, next) => {
    res.json(await userService.find(req.params.id));
})

router.put('/:id', async (req, res, next) => {
    res.json(await userService.update(req.params.id, req.body));
})

router.delete('/:id', (req, res, next) => {
    next("not implemented yet")
})

module.exports = router;
