const {
  verifyString,
} = require('./functionHelpers');
const {
  User,
} = require('../models/index');

async function corroborarAdmin(req, res, next) {
  const idToken = req.headers['access-token'];
  if (idToken !== null && idToken !== undefined && verifyString(idToken)) {
    const user = await User.findByPk(idToken);

    if (!user) return res.status(400).send('El usuario no existe');
    if (user.role === 'user' || user.role === 'banned') return res.status(400).send('El usuario no es administrador');
    return next();
  }
  return res.status(400).send('Token incorrecta.');
}

module.exports = {
  corroborarAdmin,
};
