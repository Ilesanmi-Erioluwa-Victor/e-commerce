const nodemailer = require("nodemailer")
const asyncHandler = require('express-async-handler');

exports.sendMail = asyncHandler(async (data, res, req) => {
  console.log(data)
   var transport = nodemailer.createTransport({
     host: 'smtp.gmail.com',
     port: 2525,
     auth: {
       user: `${process.env.NODEMAILER_USERNAME}`,
       pass: `${process.env.GOOGLE_APP_PASS}`,
     },
   });

  //  const resetUrl = `If you were requested to reset your account password, reset now, otherwise ignore this message
  //       <a href= ${req.protocol}://${req.get(
  //    'host'
  //  )}/api/v1/users/verify_account/${verificationToken}>Click to verify..</a>
  //      `;

   const mailOptions = {
     from: "Ifelola <'ifedayo1452@gmail.com>'",
     to: data.to,
     subject: data.subject,
     text: data.text,
     html: data.html,
   };

   transport.sendMail(mailOptions, (error, info) => {
     if (error) {
       return console.log(error);
     }
     res.json(resetUrl);
   });  
})
