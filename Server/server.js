require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const massive = require('massive');
const ctrl = require('./server-controllers');
// const axios = require('axios');

const app = express();

app.use(bodyParser.json());

const {
 SERVER_PORT,
 CONNECTION_STRING,
 SESSION_SECRET,
} = process.env

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('Database reporting for duty');
});


//endpoints
app.get('/api/all-users', ctrl.getAllUsers);
app.post('/api/new-user', ctrl.createUser);


app.listen(SERVER_PORT, () => console.log(`Listening in on ${SERVER_PORT}`));