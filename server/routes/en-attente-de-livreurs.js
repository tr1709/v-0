const fs = require("fs");
const path = require("path");

module.exports = pendingDelivery = (req, res) => {
	const id = req.params.id;

	fs.readFile(path.join(__dirname, "../data/commandes.json"), (err, data) => {
		// Check for errors
		if (err) throw err;
		// Converting to JSON
		const datas = JSON.parse(data);
		const commandes = datas.filter(
			(commande) =>
				commande.restaurantId === id &&
				commande.isready === true &&
				commande.underDelivery === false &&
				commande.isDelivered === false 
		);
		res.send(commandes);
	});
};
