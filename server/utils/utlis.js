const fs = require("fs");
const path = require("path");
const commandes = require("../data/commandes.json");
var colors = require("colors/safe");
// save commande
module.exports = saveComande = async (data) => {
	commandes.push(data);
	console.log(
		`Commande numero ${colors.green(
			data.numeroCommande
		)} créée le ${colors.green(data.date)}`
	);
	console.log(colors.magenta(data));
	fs.writeFile(
		path.join(__dirname, "../data/commandes.json"),
		JSON.stringify(commandes),
		(err) => {
			// Checking for errors
			if (err) throw err;
			console.log("Commande added successfully"); // Success
		}
	);
};
