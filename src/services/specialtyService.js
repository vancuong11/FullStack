import db from '../models/index';
require('dotenv').config();

let createNewSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.descriptionHTML || !data.imageBase64 || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    message: 'Missing required parameter',
                });
            } else {
                await db.Specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                });

                resolve({
                    errCode: 0,
                    message: 'Create specialty succeed',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll();
            if (data && data.length > 0) {
                data.map((item) => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                });
            }
            resolve({
                errCode: 0,
                data: data,
            });
        } catch (error) {
            reject(error);
        }
    });
};

let getDetailSpecialtyById = (id, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id || !location) {
                resolve({
                    errCode: 1,
                    message: 'Missing required parameter',
                });
            } else {
                let data = await db.Specialty.findOne({
                    where: {
                        id: id,
                    },
                    attributes: ['descriptionHTML', 'descriptionMarkdown'],
                });

                if (data) {
                    let doctorSpecialty = [];
                    if (location === 'ALL') {
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: {
                                specialtyId: id,
                            },
                            attributes: ['doctorId', 'provinceId'],
                        });
                    } else {
                        // find by location
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: {
                                specialtyId: id,
                                provinceId: location,
                            },
                            attributes: ['doctorId', 'provinceId'],
                        });
                    }

                    data.doctorSpecialty = doctorSpecialty;
                } else {
                    data = {};
                }
                resolve({
                    errCode: 0,
                    data: data,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createNewSpecialty,
    getAllSpecialty,
    getDetailSpecialtyById,
};
