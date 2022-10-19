const fs = require("fs");
const path = require("path");

module.exports = getACommande = (req, res) => {
  const id = req.params.id
	fs.readFile(path.join(__dirname, "../data/commandes.json"), (err, data) => {
		// Check for errors
		if (err) throw err;
		// Converting to JSON
		const commandes = JSON.parse(data);
    const commande =  commandes.filter(commande => commande.id === id)
		res.send(commande);
	});
};
