const fs = require("fs");
const path = require("path");

module.exports = getRestaurants = (req, res) => {
	fs.readFile(path.join(__dirname, "../data/restaurants.json"), (err, data) => {
		// Check for errors
		if (err) throw err;
		// Converting to JSON
		const restaurants = JSON.parse(data);
		res.send(restaurants);
	});
};
