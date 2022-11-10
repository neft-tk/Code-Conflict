const router = require('express').Router();
const userRoutes = require('./userRoutes');
const devRoutes = require('./devRoutes');
const moveRoutes = require('./moveRoutes');

router.use('/users', userRoutes);
router.use('/devs', devRoutes);
router.use('/moves', moveRoutes);

module.exports = router;
