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

let displayCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('displayCRUD', { data: data });
};

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let dataUser = await CRUDService.getUserInfoById(userId);
        return res.render('editCRUD', { user: dataUser });
    }
    return res.send('Not found');
};

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUser(data);
    return res.render('displayCRUD', { data: allUsers });
};

module.exports = {
    getHomePage,
    getCRUD,
    postCRUD,
    displayCRUD,
    getEditCRUD,
    putCRUD,
};
