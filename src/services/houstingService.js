const Offer = require('../models/Offer');

exports.create = (offerData) => Offer.create(offerData);

exports.update = (offerId, newData) => Offer.findByIdAndUpdate(offerId, newData);

exports.delete = (offerId) => Offer.findByIdAndDelete(offerId);

exports.getAll = () => Offer.find();

exports.getOne = (offerId) => Offer.findById(offerId);

exports.getOneDetailed = (offerId) => Offer.findById(offerId).populate('owner').populate('rented');

exports.topHouses = () => Offer.find().sort({ createdAt: -1 }).limit(3);

exports.filter = (type) => Offer.find({ type });

//Other way to make decrement places
// exports.addTenant = (offerId, userId) => Offer.findByIdAndUpdate({ _id: offerId },
//     {
//         $push: { tenants: userId },
//         $inc: { availablePieces: -1 },
//     }); 