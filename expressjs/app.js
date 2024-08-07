const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const db = require('./db');
const userRoute = require('./controller/userController');
const marksheetRoute = require('./controller/marksheetController')

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to match your React frontend's URL
    credentials: true
}));

app.use(bodyParser.json());

app.use(session({
    secret: 'your_secret_key', // Change this to a strong secret
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.use('/api/user', userRoute);
app.use('/api/marksheet', marksheetRoute);

const port = 5000;

app.listen(port, () => {
    console.log("Server is running on: http://localhost:" + port);
});
