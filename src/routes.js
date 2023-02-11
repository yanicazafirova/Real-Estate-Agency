const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const houstingController = require('./controllers/publicationController');

router.use(homeController);
router.use('/auth', authController);
router.use('/houstings', houstingController);
router.get('/*', (req, res) => {
    res.render('home/404');
});

module.exports = router;