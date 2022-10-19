const fs = require("fs");
const path = require("path");

module.exports = pendingDelivery = (req, res) => {
	fs.readFile(path.join(__dirname, "../data/commandes.json"), (err, data) => {
		// Check for errors
		if (err) throw err;
		// Converting to JSON
    const datas = JSON.parse(data);
    const isReady =  datas.filter(commande => commande.isready === true)
    const underDelivery =  isReady.filter(commande => commande.underDelivery === false)
		res.send(underDelivery);
	});
};
