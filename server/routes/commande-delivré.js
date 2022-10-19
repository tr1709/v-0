const fs = require("fs");
const path = require("path");
const commandes = require("../data/commandes.json");

module.exports = commandeLivre = (req, res) => {
	const id = req.params.id;

	const commande = commandes.find(
		(commande) =>
			commande.isready === true &&
			commande.id === id &&
			commande.underDelivery === true
	);
	if (commande) {
		commande.underDelivery = false;
		commande.isDelivered = true;
		commande.livréLe = new Date(Date.now("en-US")).toLocaleString();
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
