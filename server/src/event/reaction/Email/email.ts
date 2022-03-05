import nodemailer from 'nodemailer';

export const emailSending = (user, params) => {
    var transporter = nodemailer.createTransport({
        service: 'yahoo',
        auth: {
          user: 'area.ishish@yahoo.com',
          pass: 'mlog rrbf ywmy denn'
        }
    });
    var mailOptions = {
        from: 'Area Ish Ish <area.ishish@yahoo.com>',
        to: params.email,
        subject: 'Action Triggered !',
        text: params.message,
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
