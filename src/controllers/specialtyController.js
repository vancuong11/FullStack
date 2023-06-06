import specialtyService from '../services/specialtyService';

let createNewSpecialty = async (req, res) => {
    try {
        let info = await specialtyService.createNewSpecialty(req.body);
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
    createNewSpecialty,
};
