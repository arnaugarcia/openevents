require("dotenv").config();

const express = require('express')

const mysql = require("mysql2")
global.connection = mysql.createConnection(process.env.DATABASE_URL);

const app = express();
const port = 3000;

app.use(express.json());

const usersRoute = require('./modules/users/users.route');

app.use("/users" , usersRoute)

app.get('*', (req, res) => {
    res.json({ error: "404"})
});

app.listen(port, () => {
    console.log(`Application up and running on: http://localhost:${port}`)
})
