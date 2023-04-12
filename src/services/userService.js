import bcrypt from 'bcryptjs';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);

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

let getAllUsers = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (id === 'ALL') {
                users = await db.User.findAll({
                    // khong truyen password cho client
                    attributes: {
                        exclude: ['password'],
                    },
                });
            }
            if (id && id !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: id },
                    attributes: {
                        exclude: ['password'],
                    },
                });
            }
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
};

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email is exist
            let check = await checkUserEmail(data.email);
            if (check) {
                resolve({
                    errCode: 1,
                    message: 'Email already exists, please try another email',
                });
            }
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            });
            resolve({
                errCode: 0,
                message: 'Ok',
            });
        } catch (error) {
            reject(error);
        }
    });
};

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    });
};

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id },
            });
            if (!user) {
                resolve({
                    errCode: 2,
                    message: 'The user does not exist',
                });
            }
            await db.User.destroy({
                where: { id: id },
            });
            resolve({
                errCode: 0,
                message: 'The user is deleted',
            });
        } catch (error) {
            reject(error);
        }
    });
};

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    message: 'Missing required parameter',
                });
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                resolve({
                    errCode: 0,
                    message: 'updated user successfully',
                });
            } else {
                resolve({
                    errCode: 1,
                    message: 'User not found',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
module.exports = {
    handleUserLogin,
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
};
