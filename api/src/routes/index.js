const { Router } = require('express');

const router = Router();

router.get('/', (_req, res) => {
  res.send('Soy la Ruta principal');
});

module.exports = router;
