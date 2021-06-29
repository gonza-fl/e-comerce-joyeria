/* eslint-disable indent */

const {
  verifyString,
} = require('./functionHelpers');
const {
  User,
} = require('../models/index');

async function corroborarAdmin(req, res, next) {
  const idToken = req.headers['access-token'];
  if (idToken != null && idToken !== undefined && verifyString(idToken)) {
        const user = await User.findOne({
          where: {
            id: idToken,
          },
        });

        if (!user) return res.status(400).send('El usuario no existe');
        if (user.role !== 'user') return res.status(400).send('El usuario no es administrador');
        return next();
      // eslint-disable-next-line arrow-body-style
  }
    return res.status(400).send('Token incorrecta.');
}

module.exports = {
  corroborarAdmin,
};
