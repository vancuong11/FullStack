import clinicService from '../services/clinicService';

let createNewClinic = async (req, res) => {
    try {
        let info = await clinicService.createNewClinic(req.body);
        return res.status(200).json(info);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...',
        });
    }
};

module.exports = {
    createNewClinic,
};
