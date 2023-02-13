const houstingService = require('../services/houstingService');

exports.isOwner = async (req, res, next) => {
    const offerId = req.params.offerId;

    const offer = await houstingService.getOne(offerId).lean();

    if (offer.author == req.user._id) {

        return res.redirect(`/publication/${req.params.offerId}/details`);
    }

    req.offer = offer;
    next();
};

exports.checkIsOwner = async (req, res, next) => {
    let offer = await houstingService.getOne(req.params.offerId);

    if (offer.owner == req.user._id) {
        req.offer = offer;
        next();
    } else {
        res.redirect(`/publication/${req.params.offerId}/details`);
    }

}