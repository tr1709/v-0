const fs = require("fs");
const path = require("path");

module.exports = getDeliverers = (req, res) => {
	fs.readFile(path.join(__dirname, "../data/livreur.json"), (err, data) => {
		// Check for errors
		if (err) throw err;
		// Converting to JSON
		const deliverers = JSON.parse(data);
		res.send(deliverers);
	});
};
