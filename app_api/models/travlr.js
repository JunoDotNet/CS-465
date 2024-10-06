const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    code: {type: String, required: true, index: true},
    name: {type: String, required: true, index: true},
    length: {type: String, required: true },
    start: {type: String, required: true },
    resort: {type: String, required: true },
    image: {type: String, required: true },
    description: {type: String, required: true }
});
const Trip = mongoose.model('trips', tripSchema);
module.exports = Trip;