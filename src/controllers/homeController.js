import db from '../models/index';
import CRUDService from '../services/CRUDservice';
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage', {
            data: data,
        });
    } catch (error) {
        console.log(error);
    }
};

let getCRUD = (req, res) => {
    return res.render('crud');
};

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('post ');
};

module.exports = {
    getHomePage,
    getCRUD,
    postCRUD,
};
