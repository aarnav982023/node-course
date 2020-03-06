const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "aarnav982023@gmail.com",
    subject: "Thanks for joining in!",
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
  });
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "aarnav982023@gmail.com",
    subject: "Sad to see you go",
    text: `Soory to see you go, ${name}. Can you tell us a reason as to why you cancelled?.`
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail
};
