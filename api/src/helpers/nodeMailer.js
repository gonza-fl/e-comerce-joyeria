const nodemailer = require('nodemailer');
const Handlebars = require('handlebars');
const {
  comprobantedepago,
} = require('./templates/comprobantedepago');
const {
  ordendespachada,
} = require('./templates/ordenDespachada');

const transporter = nodemailer.createTransport({
/*
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'ecommerceg6ft11@gmail.com', // generated ethereal user
    pass: 'vvzflnzfwawofijz', // generated ethereal password
  },
  debug: false,
  tls: {
    rejectUnauthorized: false,
  }, */
  service: 'hotmail',
  auth: {
    user: 'adaclothes@hotmail.com',
    pass: 'Lovelace123',
  },
});

const templateComprobantedepago = Handlebars.compile(comprobantedepago);
const templateOrdenDespachada = Handlebars.compile(ordendespachada);

module.exports = {
  transporter,
  templateComprobantedepago,
  templateOrdenDespachada,
};
