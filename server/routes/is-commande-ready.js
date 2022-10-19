const fs = require("fs");
const path = require("path");
const commandes = require("../data/commandes.json");
module.exports = isCommandeReady = (req, res, next) => {
	// getting id of the commande
	const id = req.params.id;
	// Converting to JSON
	const commande = commandes.find((commande) => commande.id === id);
	if (commande) {
		commande.isready = !commande.isready;
		// commande.underDelivery = !commande.underDelivery;
		commande.preparer = new Date(Date.now("en-US")).toLocaleString();
	}
	fs.writeFile(
		path.join(__dirname, "../data/commandes.json"),
		JSON.stringify(commandes),
		(err) => {
			// Checking for errors
			if (err) throw err;
			console.log("commande updated successfully"); // Success
		}
	);
	res.send(commande);
};
