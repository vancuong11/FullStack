require('dotenv').config;
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
        connectionTimeout: 5 * 60 * 1000, //5 min
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Văn Cường 👻" <cuongg121101@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: 'Thông tin đặt lịch khám bệnh', // Subject line
        html: getBodyHTMLEmail(dataSend),
        // html body
    });
};

let getBodyHTMLEmail = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào: ${dataSend.patientName}</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Booking Care</p>
        <p>Thông tin đặt lịch khám bệnh: </p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <p>Nếu các thông tin trên là đúng sự thật vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.</p>
        <div>
            <a href="${dataSend.redirectLink}" target="blank">Click here!
            </a>
        </div>
        <div>Xin chân thành cảm ơn!</div>
    `;
    }
    if (dataSend.language === 'en') {
        result = `
        <h3>Dear: ${dataSend.patientName}</h3>
        <p>You received this email because you booked an online medical appointment on Booking Care</p>
        <p>Information to schedule an appointment: </p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>
        <p>If the above information is true, please click on the link below to confirm and complete the procedure to book an appointment.</p>
        <div>
            <a href="${dataSend.redirectLink}" target="blank">Click here!
            </a>
        </div>
        <div>Sincerely thank!</div>
    `;
    }
    return result;
};

let sendAttachment = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
        connectionTimeout: 5 * 60 * 1000, //5 min
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Văn Cường 👻" <cuongg121101@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: 'Kết quả đặt lịch khám bệnh', // Subject line
        html: getBodyHTMLEmailRemedy(dataSend),
        attachments: [
            {
                filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
                content: dataSend.imageBase64.split('base64')[1],
                encoding: 'base64',
            },
        ],
        // html body
    });
};

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào: ${dataSend.patientName}</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Booking Care thành công</p>
        <p>Thông tin đơn thuốc/hóa đơn đã được gửi trong file đính kèm </p>
       
        <div>Xin chân thành cảm ơn!</div>
    `;
    }
    if (dataSend.language === 'en') {
        result = `
        <h3>Dear: ${dataSend.patientName}</h3>
        <p>You received this email because you booked an online medical appointment on Booking Care success</p>
        <p>The prescription/invoice information has been sent in the attached file. </p>
        
        <div>Sincerely thank!</div>
    `;
    }
    return result;
};

// async..await is not allowed in global scope, must use a wrapper
async function main() {}

module.exports = {
    sendSimpleEmail,
    sendAttachment,
};
