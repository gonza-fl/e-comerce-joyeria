const { Category } = require('../models/index');

const addCategory = async (req, res) => {
  const { name, description, img } = req.body; // Img por ahora es estatico.
  if (!name || name.trim().length === 0) {
    return res.json({ err: 'El nombre de la categoria no puede ser vacia' });
  }
  if (!description || description.trim().length === 0) {
    return res.json({ err: 'La descripción de la categoria no puede ser vacia' });
  }
  if (!img) {
    return res.json({ err: 'La imagen de la categoria no puede ser vacia' });
  }
  try {
    const [category, created] = await Category.findOrCreate({
      where: { name: name.trim() },
      defaults: {
        name: name.trim(),
        description: description.trim(),
        img: 'https://bodasyweddings.com/wp-content/uploads/2019/04/orden-de-los-anillos-de-boda-y-de-compromiso.jpg',
      },
    });
    if (created) {
      return res.json({ success: `La categoria ha sido creada! con el nombre: ${category.dataValues.name}` });
    }
    return res.json({ err: 'La categoria ya existe' });
  } catch (err) {
    return res.json({ err: 'Error en la conexión con la base de datos. No se pudo crear la categoría' });
  }
};

const getCategory = async (_req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ['id', 'name', 'img', 'description'],
    });
    return res.status(201).json(categories);
  } catch (err) {
    return res.status(404).json({ err: 'Se ha producido un error' });
  }
};

module.exports = {
  addCategory,
  getCategory,
};
