const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const express = require('express');
const app = express();
const server = http.createServer(app);

const pgp = require("pg-promise")();

const db = pgp("postgres://postgres:db1@localhost:5432/postgres");

db.any("SELECT * from USERS").then((users) => console.log(users));

db.any("SELECT * from USERS WHERE id = $1", [3]).then((user) =>
  console.log(user)
);

app.get('/', (req, res) => {
    res.send('Hello world');
    
});

app.get('/:profile', (req, res) => {
    const {profile} = req.params;
    res.send(`Hello ${profile}`);
    
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
