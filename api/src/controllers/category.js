const { Category } = require('../models/index');

const addCategory = async (req, res) => { 

  const { name, description } = req.body;
  if (!name || name.trim().length === 0) {
    return res.json({err:'El nombre de la categoria no puede ser vacia'});
  }
  if (!description || description.trim().length === 0) {
    return res.json({err:'La descripción de la categoria no puede ser vacia'});
  }
  
  try {
    const category = await Category.findOne({ where: { name: name.trim() } });        
    if (category === null) {
      await Category.create({ name, description });
      return res.json({success: 'La categoria ha sido creada!'});
    } else {
      return res.json({success: 'La categoria ya existe'});
    }
  }
  catch {
    return res.json({err:'Error en la conexión con la base de datos. No se pudo crear la categoría'});
  }
}

module.exports = {
  addCategory
}