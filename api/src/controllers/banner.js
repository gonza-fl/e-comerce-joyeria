/* eslint-disable no-await-in-loop */
/* eslint-disable no-loop-func */
/* eslint-disable no-continue */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-plusplus */
const {
  Image,
} = require('../models/index');
const {
  cloudinary,
} = require('../utils/cloudinary');

const getImagesBanner = async (req, res) => {
  try {
    const images = await Image.findAll({
      where: {
        type: 'banner_image',
      },
    });
    return res.json(images);
  } catch (err) {
    return res.status(500).send('Error en el banner');
  }
};
const createAndUpdateImagesBanner = async (req, res) => {
  const {
    images,
  } = req.body;

  if (images === [] || !images) return res.send('No se ha realizado ningún cambio!');
  try {
    if (images > 5) return res.status(400).send('No puede haber mas de 5 banners');
    let banners = await Image.findAll({
      where: {
        type: 'banner_image',
      },
    });
    const newImages = [];

    for (let i = 0; i < images.length; i++) {
      if (images[i].hasOwnProperty('url')) {
        banners = banners.filter((ban) => ban.url !== banners[i].url);
      } else {
        newImages.push(images[i]);
        if (banners[i]) await banners[i].destroy();
      }
    }

    for (let i = 0; i < newImages.length; i++) {
      const uploadedResponse = (newImages[i] !== 'test' && await cloudinary.uploader.upload(newImages[i], {
        upload_preset: 'henry',
      }));

      await Image.create({
        url: uploadedResponse.secure_url,
        type: 'banner_image',
      });
    }
    return res.send('Banner actualizado correctamente!');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal server error.');
  }
};
module.exports = {
  getImagesBanner,
  createAndUpdateImagesBanner,
};
