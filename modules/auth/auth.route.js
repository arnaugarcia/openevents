const express = require("express");
const router = express.Router();

const AuthService = require('./auth.service');
const authService = new AuthService();

router.post('/login', async (req, res, next) => {
    res.json(await authService.register(req.body));
});

router.post('/login', async (req, res, next) => {
    res.json(await authService.authenticate(req.body.username, req.body.password));
});

