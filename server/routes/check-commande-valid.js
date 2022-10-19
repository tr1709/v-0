const fs = require("fs");
const path = require("path");
const commandes = require("../data/commandes.json");
module.exports = isCommande = (req, res) => {
	const id = req.params.id;
	const livreur = req.body.livreur;
	console.log(livreur);
	const commande = commandes.find(
		(commande) =>
			commande.isready === true &&
			commande.restaurantId === id &&
			commande.underDelivery === false&&
			commande.numeroCommande === req.body.num
	);
	if (commande) {
		commande.underDelivery = true;
		commande.enleverLe = new Date(Date.now("en-US")).toLocaleString();
		commande.livreur = livreur;
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
	if(!commande) res.send(null);
	if (commande) {
		res.send(commande);
	}
};
