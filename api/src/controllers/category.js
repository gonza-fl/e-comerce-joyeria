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
    const [category, created] = await Category.findOrCreate({ 
      where: { name: name.trim() }, 
      defaults: { name: name.trim(), description: description.trim() }
    });        
    if (created) {
      return res.json({success: 'La categoria ha sido creada!'});
    } 
    return res.json({err: 'La categoria ya existe'});
  }
  catch {
    return res.json({err:'Error en la conexión con la base de datos. No se pudo crear la categoría'});
  }
}

module.exports = {
  addCategory
}