const fs = require("fs");
const path = require("path");

module.exports = commandeApreparer = (req, res) => {
	fs.readFile(path.join(__dirname, "../data/commandes.json"), (err, data) => {
    const {id} = req.body
		// Check for errors
		if (err) throw err;
		// Converting to JSON
		const commandes = JSON.parse(data);
    const resto = commandes.filter(resto => resto.restaurantId === id)
    const preparer = resto.filter(commande => commande.isready === false && commande.canceled === false )
		res.send(preparer);
	});
};
