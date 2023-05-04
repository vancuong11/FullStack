import express from 'express';
import bodyParser from 'body-parser';
require('dotenv').config();
// import cors from 'cors';

import viewEngine from './config/viewEngine';
import initWebRoute from './routes/web';
import connectDB from './config/connectDB';

let app = express();

// Add headers before the routes are defined
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// // config app
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

viewEngine(app);
initWebRoute(app);

connectDB();

let port = process.env.PORT || 3979;

app.listen(port, () => {
    // call back
    console.log('Backend Nodejs is running on the port: ' + port);
});
