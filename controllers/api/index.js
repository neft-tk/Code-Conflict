const router = require('express').Router();
const userRoutes = require('./userRoutes');
const devRoutes = require('./devRoutes');

router.use('/users', userRoutes);
router.use('/devs', devRoutes);

module.exports = router;
