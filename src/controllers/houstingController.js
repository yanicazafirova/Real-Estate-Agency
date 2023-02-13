const router = require('express').Router();

const houstingService = require('../services/houstingService');
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorMessage');
//const { checkIsOwner } = require('../middlewares/offerMiddleware');

router.get('/create', isAuth, (req, res) => {
    res.render('housting/create');
});

router.post('/create', isAuth, async (req, res) => {
    const { name, type, year, city, image, description, availablePieces } = req.body;

    try {
        const offer = await houstingService.create({ name, type, year, city, image, description, availablePieces, owner: req.user._id });

        res.redirect('/houstings/for-rent');
    } catch (error) {
        res.render('housting/create', { error: getErrorMessage(error) });
    }
});

router.get('/for-rent', async (req, res) => {
    const offers = await houstingService.getAll().lean();
    res.render('housting/forRent', { offers });
});

router.get('/:offerId/details', async (req, res) => {
    const offer = await houstingService.getOneDetailed(req.params.offerId).lean();
    const isAuthor = offer.owner._id == req.user?._id;
    //TODO: Chek is rent
    const tenants = getRented(offer);

    const isAvailable = offer.availablePieces > 0;
    const isRented = offer.rented.some(x => x._id == req.user?._id);

    res.render('housting/details', { ...offer, isAuthor, tenants, isAvailable, isRented });
});

router.get('/:offerId/rent', async (req, res) => {
    const offer = await houstingService.getOneDetailed(req.params.offerId);
    offer.rented.push(req.user._id);
    offer.availablePieces -= 1;
    await offer.save();

    //Push user to tenant array (other way)
    //await houstingService.addTenant(req.params.offerId, req.user._id);

    res.redirect(`/houstings/${req.params.offerId}/details`);
});

router.get('/:offerId/edit', isAuth, async (req, res) => {
    const offer = await houstingService.getOne(req.params.offerId).lean();

    res.render('housting/edit', { ...offer });
});

router.post('/:offerId/edit', isAuth, async (req, res) => {
    await houstingService.update(req.params.offerId, req.body);
    res.redirect(`/houstings/${req.params.offerId}/details`);
});

router.get('/:offerId/delete', async (req, res) => {
    await houstingService.delete(req.params.offerId);
    res.redirect('/houstings/for-rent');
});

router.get('/search', (req, res) => {
    res.render('housting/search');
});

router.post('/search', async (req, res) => {
    const { type } = req.body;
    const offers = await houstingService.filter(type).lean();
   
    res.render('housting/search', { offers });
});

function getRented(offer) {
    return offer.rented.map(x => x.name).join(', ');
}

module.exports = router;