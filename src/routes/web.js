import express from 'express';

let router = express.Router();

let initWebRoute = (app) => {
    router.get('/', (req, res) => {
        res.send('Welcome Server Node');
    });
    return app.use('/', router);
};

module.exports = initWebRoute;
