const fs = require("fs");
const path = require("path");

module.exports = allDelivered = (req, res) => {
	fs.readFile(path.join(__dirname, "../data/commandes.json"), (err, data) => {
		// Check for errors
		if (err) throw err;
		// Converting to JSON
		const commandes = JSON.parse(data);
		const delivered = commandes.filter(
			(commande) =>
				commande.isready === true && commande.underDelivery === false && commande.isDelivered === true
		);
		res.send(delivered);
	});
};
