import express from 'express';
import homeController from '../controllers/homeController';
let router = express.Router();

let initWebRoute = (app) => {
    router.get('/', (req, res) => {
        res.send('Welcome Server Node');
    });

    router.get('/home', homeController.getHomePage);
    return app.use('/', router);
};

module.exports = initWebRoute;
