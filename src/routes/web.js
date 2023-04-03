import express from 'express';
import homeController from '../controllers/homeController';
let router = express.Router();

let initWebRoute = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    return app.use('/', router);
};

module.exports = initWebRoute;
