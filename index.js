require("dotenv").config();

const Joi = require('joi');
global.joi = Joi;

const express = require('express');

const mysql = require("mysql2");
global.connection = mysql.createConnection(process.env.DATABASE_URL);

const app = express();
const port = 3000;

app.use(express.json());

const usersRoute = require('./modules/users/users.route');
const authRoute = require('./modules/auth/auth.route');
const eventsRoute = require('./modules/events/events.route');
const assistanceRoute = require('./modules/assistance/assistance.route');
const messagesRoute = require('./modules/messages/messages.route');
const friendsRoute = require('./modules/friends/friends.route');

const {privateRoute} = require("./middlewares/privateRoute");

app.use("/users", authRoute);
app.use("/users", [privateRoute, usersRoute]);
app.use("/events", [privateRoute, eventsRoute]);
app.use("/assistances", [privateRoute, assistanceRoute]);
app.use("/messages", [privateRoute, messagesRoute]);
app.use("/friends", [privateRoute, friendsRoute]);

app.get('*', (req, res) => {
    res.json({error: "404"})
});

app.listen(port, () => {
    console.log(`Application up and running on: http://localhost:${port}`)
})
