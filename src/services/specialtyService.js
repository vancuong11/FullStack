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

module.exports = {
    createNewSpecialty,
};
