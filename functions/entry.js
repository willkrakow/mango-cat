const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "willkrakow@gmail.com",
    pass: process.env.MAIL_PASS,
  },
})

const mailOptions = {
  from: "willkrakow@gmail.com",
  to: "willkrakow@gmail.com",
  subject: "New visit to themangocat.com",
  text: "Someone is on the site!",
}

exports.handler = async function (event, context) {
    console.log(context, event)
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log("Email sent: " + info.response)
    }
  })
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Entry.js ran" }),
  }
}
