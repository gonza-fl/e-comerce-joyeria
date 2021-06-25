const {
  Category,
} = require('../models/index');
const {
  cloudinary,
} = require('../utils/cloudinary');
const {
  verifyNumber,
} = require('../helpers/functionHelpers');

const addCategory = async (req, res) => {
  const {
    name, description, img,
  } = req.body;

  if (!name || name.trim().length === 0) return res.status(400).send('El nombre de la categoria no puede ser vacia');
  if (!description || description.trim().length === 0) return res.status(400).send('La descripción de la categoria no puede ser vacia');
  if (!img) return res.status(400).send('La imagen de la categoria no puede ser vacia');
  try {
    const uploadedResponse = (img !== 'test' && await cloudinary.uploader.upload(img, {
      upload_preset: 'henry',
    }));
    const [category, created] = await Category.findOrCreate({
      where: {
        name: name.trim(),
      },
      defaults: {
        name: name.trim(),
        description: description.trim(),
        img: uploadedResponse.secure_url || 'https://bodasyweddings.com/wp-content/uploads/2019/04/orden-de-los-anillos-de-boda-y-de-compromiso.jpg',
      },
    });
    if (created) return res.send(`La categoria ha sido creada! con el nombre: ${category.dataValues.name}`);
    return res.status(400).send('La categoria ya existe');
  } catch (err) {
    return res.status(500).send('Internal server error. Categoría no fue creada');
  }
};

const updateCategory = async (req, res) => {
  const {
    newName, newDescription, newImg,
  } = req.body;
  if (!verifyNumber(req.body.id).veracity) return res.status(400).send(verifyNumber(req.body.id, 'id de categoría').msg);
  const id = parseInt(req.body.id, 10);
  try {
    const categoryFound = await Category.findByPk(id);
    if (categoryFound === null) return res.status(400).send(`No existe categoría con el id: ${id} en la base de datos`);
    const uploadedResponse = (newImg !== 'test' && await cloudinary.uploader.upload(newImg, {
      upload_preset: 'henry',
    }));
    if (uploadedResponse) {
      await Category.update({
        name: newName,
        description: newDescription,
        img: uploadedResponse.secure_url,
      }, {
        where: {
          id,
        },
      });
      return res.send('La categoria ha sido modificada exitosamente!');
    } return res.status(400).send('Error en la conexión con la base de datos. Faltan imagenes.');
  } catch {
    return res.status(500).send('Internal server error. Categoría no fue actualizada');
  }
};

const delCategory = async (req, res) => {
  const {
    categoryId,
  } = req.params;
  if (!verifyNumber(categoryId).veracity) return res.status(400).send(verifyNumber(categoryId, 'ID de categoría').msg);
  const id = parseInt(categoryId, 10);
  try {
    const categoryById = await Category.findByPk(id);
    if (!categoryById) return res.status(400).send('La categoria no existe');
    await categoryById.destroy();
    return res.send('La categoria ha sido eliminada!');
  } catch {
    return res.status(500).send('Internal server error. Categoría no fue eliminada');
  }
};

const getCategories = async (_req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ['id', 'name', 'img', 'description'],
    });
    return res.status(201).json(categories);
  } catch (err) {
    return res.status(404).send('Internal server error. No se pudieron obtener las categorías');
  }
};

module.exports = {
  addCategory,
  getCategories,
  updateCategory,
  delCategory,
};
