const express = require("express");
const router = express.Router();

const AuthService = require('./auth.service');
const UsersService = require("../users/users.service");

const usersService = new UsersService();
const authService = new AuthService(usersService);

router.post('/', async (req, res, next) => {
    res.json(await authService.register(req.body));
});

router.post('/login', async (req, res, next) => {
    const schema = joi.object({
        email: joi.string().required(),
        password: joi.string().required()
    });

    const validate = schema.validate(req.body);
    if (validate.error) {
        res.status(400).json(validate.error.details);
        return;
    }
    const token = await authService.authenticate(req.body.email, req.body.password);
    if (token) {
        res.json({access_token: token});
    } else {
        res.status(401).json({error: "Invalid credentials"});
    }
});


module.exports = router;
