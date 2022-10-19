const fs = require("fs");
const path = require("path");

module.exports = allApreparer = (req, res) => {
	fs.readFile(path.join(__dirname, "../data/commandes.json"), (err, data) => {
		// Check for errors
		if (err) throw err;
		// Converting to JSON
		const commandes = JSON.parse(data);
		const preparer = commandes.filter(
			(commande) => commande.isready === false && commande.canceled === false 
		);
		res.send(preparer);
	});
};
