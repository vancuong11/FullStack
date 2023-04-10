import bcrypt from 'bcryptjs';
import db from '../models/index';

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExits = await checkUserEmail(email);
            if (isExits) {
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email },
                    raw: true,
                });
                if (user) {
                    // compare pw
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMsg = 'Ok';
                        delete user.password; // not show password
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMsg = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMsg = `User's not found`;
                }
            } else {
                userData.errCode = 1;
                userData.errMsg = `Your 's Email isn't exits in your system. Please try other email`;
            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    });
};

let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: email },
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    handleUserLogin,
};
