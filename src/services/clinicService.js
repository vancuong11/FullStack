import db from '../models/index';
require('dotenv').config();

let createNewClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.name ||
                !data.address ||
                !data.descriptionHTML ||
                !data.imageBase64 ||
                !data.descriptionMarkdown
            ) {
                resolve({
                    errCode: 1,
                    message: 'Missing required parameter',
                });
            } else {
                await db.Clinic.create({
                    name: data.name,
                    address: data.address,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                });

                resolve({
                    errCode: 0,
                    message: 'Create Clinic succeed',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createNewClinic,
};
