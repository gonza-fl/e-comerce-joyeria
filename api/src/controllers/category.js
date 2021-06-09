const { Category , productCategory} = require('../models/index');

const addCategory = async (req, res) => {
  const { name, description, img } = req.body; // Img por ahora es estatico.
  if (!name || name.trim().length === 0) {
    return res.json({err:"The name of the category can't be empty"});
  }
  if (!description || description.trim().length === 0) {
    return res.json({err:"The description of the category can't be empty"});
  }
  if (!img) {
    return res.json({ err: "The category of the image can't be empty" });
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
      return res.json({ success: `The category has been created! with the name: ${category.dataValues.name}` });
    }
    return res.json({ err: 'The category already exist' });
  } catch (err) {
    return res.json({ err: 'Something happened :( the category has not been created' });
  }
};

const getCategory = async (_req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ['id', 'name', 'img', 'description'],
    });
    return res.status(201).json(categories);
  } catch (err) {
    return res.status(404).json({ err: 'Something happened :(' });
  }
};

const updateCategory = async (req, res) => {
  const { newName, newDescription, newImg } = req.body;
  const id = parseInt(req.body.id, 10);
  try {
    const categoryFound = await Category.findByPk(id);
    if (categoryFound === null) {
      return res.status(404).json({ err: `There's no category with de id: ${id} in the database` });
    }
    await Category.update({
      name: newName,
      description: newDescription,
      img: newImg,
    }, {
      where: { id },
    });
    return res.json({ success: 'The category has been successfully modified!' });
  } catch {
    return res.status(500).json({ err: "The category couldn't been updated" });
  }
};

const delCategory = async (req, res) => { 

  const { categoryId } = req.params;

  if (categoryId==undefined || categoryId==null) {
    return res.json({err:"The id of the category can't be empty"});
  }
  
  try {

    const cat = await Category.findByPk(Number(categoryId));

    if (cat === null) {
      return res.json({err:"The category doesn't exist"});
    } else {

      await productCategory.destroy({where:{categoryId:categoryId}})

      await cat.destroy()

      return res.json({success: 'The category has been deleted!'})
    }
    
  }
  catch {
    return res.json({err:'Something happened :( the category has not been created'});
  }
}


module.exports = {
  addCategory,
  getCategory,
  updateCategory,
  delCategory
};
