const Mongoose = require('./db');
const Trip = require('./travlr');

var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
};

seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
});
