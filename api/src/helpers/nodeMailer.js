// Henry2021  kmoraemail@gmail.com
const nodemailer = require('nodemailer');
const Handlebars = require('handlebars');
const {
  comprobantedepago,
} = require('./templates/comprobantedepago');
const {
  ordendespachada,
} = require('./templates/ordenDespachada');
const {
  ordencancelada,
} = require('./templates/ordenCancelada');

const transporter = nodemailer.createTransport({
/*
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'kmoraemail@gmail.com', // generated ethereal user
    pass: 'Henry2021', // generated ethereal password
  },
  debug: false,
  tls: {
    rejectUnauthorized: false,
  }, */
  /*
  service: 'hotmail',
  port: 587,
  auth: {
    user: 'heladodechocolateconconitodechocolate@outlook.com',
    pass: 'Lalala123',
  }, */
  host: 'smtp.gmail.com',
  port: 465,
  service: 'gmail',
  auth: {
    user: 'kmoraemail@gmail.com',
    pass: 'Henry2021', // naturally, replace both with your real credentials or an application-specific password
  },
});

const templateComprobantedepago = Handlebars.compile(comprobantedepago);
const templateOrdenDespachada = Handlebars.compile(ordendespachada);
const templateOrdenCancelada = Handlebars.compile(ordencancelada);
module.exports = {
  transporter,
  templateComprobantedepago,
  templateOrdenDespachada,
  templateOrdenCancelada,
};
