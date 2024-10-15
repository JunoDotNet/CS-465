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

const tripsAddTrip = async (req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();

    if(!q) 
    {
        return res
            .status(400)
            .json(q);
    } else{
        return res 
            .status(201)
            .json(q);
    }
};

const tripsUpdateTrip = async (req, res) => {
    try {
        // Uncomment for debugging
        console.log(req.params);
        console.log(req.body);

        const q = await Trip.findOneAndUpdate(
            { 'code': req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true } // Return the updated document
        ).exec();

        if (!q) {
            // Database returned no data
            return res.status(404).json({ message: 'Trip not found' });
        } else {
            // Return resulting updated trip
            return res.status(200).json(q);
        }
    } catch (error) {
        console.error('Error occurred while updating trip:', error);
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip 
};
