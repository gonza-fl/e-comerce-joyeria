const { Category , productCategory} = require('../models/index');

const addCategory = async (req, res) => { 

  const { name, description } = req.body;
  if (!name || name.trim().length === 0) {
    return res.json({err:"The name of the category can't be empty"});
  }
  if (!description || description.trim().length === 0) {
    return res.json({err:"The description of the category can't be empty"});
  }
  
  try {
    const [category, created] = await Category.findOrCreate({ 
      where: { name: name.trim() }, 
      defaults: { name: name.trim(), description: description.trim() }
    });        
    if (created) {
      return res.json({success: 'The category has been created!'});
    } 
    return res.json({err: 'The category already exist'});
  }
  catch {
    return res.json({err:'Something happened :( the category has not been created'});
  }
}

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
  delCategory
}