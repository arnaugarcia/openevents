require("dotenv").config();

const express = require('express')

const mysql = require("mysql2")
global.connection = mysql.createConnection(process.env.DATABASE_URL);

const app = express()
const port = 3000

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
