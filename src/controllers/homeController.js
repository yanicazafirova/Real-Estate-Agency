const router = require('express').Router();

const houstingService = require('../services/houstingService');

router.get('/', async (req, res) => {
    const offers = await houstingService.topHouses().lean();
    res.render('home', { offers });
});

module.exports = router;