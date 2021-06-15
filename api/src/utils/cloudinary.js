/* eslint linebreak-style: ["error", "windows"] */
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDNAME,
  api_key: process.env.REACT_APP_APIKEY,
  api_secret: process.env.REACT_APP_APISECRET,
});

module.exports = {
  cloudinary,
};
