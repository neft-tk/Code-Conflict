const router = require('express').Router();
const userRoutes = require('./userRoutes');
const devRoutes = require('./devRoutes');
const moveRoutes = require('./moveRoutes');
const battleRoutes = require('./battleRoutes');

router.use('/users', userRoutes);
router.use('/devs', devRoutes);
router.use('/moves', moveRoutes);
router.use('/battle', battleRoutes);

module.exports = router;
