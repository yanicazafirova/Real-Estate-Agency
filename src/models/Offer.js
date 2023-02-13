const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [6, 'Name should be a minimum 6 characters long!'],
    },
    type: {
        type: String,
        required: [true, 'Type is required!'],
        enum: ["Apartment", "Villa", "House"],
    },
    year: {
        type: Number,
        required: [true, 'Year is required!'],
        min: 1850,
        max: 2021,
    },
    city: {
        type: String,
        required: true,
        minLength: [4, 'The City should be at least 4 characters long!'],
    },
    image: {
        type: String,
        required: true,
        validate: [/^https?:\/\//i, 'Image URL should start with http/https!'],
    },
    description: {
        type: String,
        required: true,
        maxLength: [60, 'Description should be a maximum of 60 characters long!'],
    },
    availablePieces: {
        type: Number,
        required: true,
        min: 0,
        max: 10,
    },
    rented: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
});

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;