import userService from '../services/userService';

let handleLogin = async (req, res) => {
    // 1. check email exits
    // 2. compare pw
    // 3. return userInfo
    // 4. access token: JWT
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameters',
        });
    }

    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMsg,
        user: userData.user ? userData.user : {},
    });
};

let handleGetAllUsers = async (req, res) => {
    let id = req.body.id; //ALL / id
    if (id) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing required parameter',
            users,
        });
    }
    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        message: 'Ok',
        users,
    });
};

module.exports = {
    handleLogin,
    handleGetAllUsers,
};
