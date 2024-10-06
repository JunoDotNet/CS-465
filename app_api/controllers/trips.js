const mongoose = require('mongoose');
const Trip = require('../models/travlr'); 

const tripsFindByCode = async (req, res) => {
    try {
        const q = await Trip.find({ 'code': req.params.tripCode }).exec();

        if (!q || q.length === 0) { 
            return res.status(404).json({ message: 'Trip not found' }); 
        } else {
            return res.status(200).json(q);
        }
    } catch (error) { 
        console.error('Error occurred while fetching trip:', error);
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};


const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find().exec();
        return res.status(200).json(trips); 
    } catch (error) {
        console.error('Error occurred while fetching trips:', error);
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};
