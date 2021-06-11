const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'grupo6',
  api_key: '256513813971585',
  api_secret: 'aaDvTHfyRbcGV3RmuXVNzKtI-6I',
});

module.exports = { cloudinary };
