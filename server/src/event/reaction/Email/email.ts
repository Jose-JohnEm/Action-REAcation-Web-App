import nodemailer from 'nodemailer';

/**
 * Send an email
 * @param user The owner of the Area action/reaction
 * @param params The parameters of the email
 */
export const emailSending = (user, params) => {
    let transporter = nodemailer.createTransport({
        service: 'yahoo',
        auth: {
            user: 'area.ishish@yahoo.com',
            pass: 'mlog rrbf ywmy denn'
        }
    });

    let mailOptions = {
        from: 'Area Ish Ish <area.ishish@yahoo.com>',
        to: params.email,
        subject: 'Action Triggered !',
        text: params.message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
