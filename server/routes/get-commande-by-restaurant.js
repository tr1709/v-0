const fs = require("fs");
const path = require("path");

module.exports = getCommandeByRestaurants = (req, res) => {
	const id = req.params.id;;
	fs.readFile(path.join(__dirname, "../data/commandes.json"), (err, data) => {
		// Check for errors
		if (err) throw err;
		// Converting to JSON
    const datas = JSON.parse(data);
    const commande =  datas.filter(commande => commande.restaurantId === id)
		// const commandes =  commande.filter(commande => commande.isready === false)
		res.send(commande);
	});
};
