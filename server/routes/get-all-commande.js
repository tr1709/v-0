const fs = require("fs");
const path = require("path");

module.exports = getAllCommande = (req, res) => {
	fs.readFile(path.join(__dirname, "../data/commandes.json"), (err, data) => {
		// Check for errors
		if (err) throw err;
		// Converting to JSON
		const commandes = JSON.parse(data);
		res.send(commandes);
	});
};
