import db from '../models/index';

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

module.exports = {
    getHomePage,
};
