import express from 'express';
import bodyParser from 'body-parser';
require('dotenv').config();

import viewEngine from './config/viewEngine';
import initWebRoute from './routes/web';

let app = express();

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoute(app);

let port = process.env.PORT || 3979;

app.listen(port, () => {
    // call back
    console.log('Backend Nodejs is running on the port: ' + port);
});
