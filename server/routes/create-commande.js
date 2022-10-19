const saveCommande = require("../utils/utlis");
const restaurants = require("../data/restaurants.json")
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const createCommande = (req, res) => {
	// get data from req.body
	const { nom, nombreRepas, rue, numMaison, numBoite, codePostal, commune } =
		req.body;
	// restaurant
	const restaurantId = req.params.id;
	const restaurant = restaurants.find(resto =>resto.id === restaurantId)
	// generating an id
	const id = crypto.randomBytes(16).toString("hex");
	// date
	const date = new Date(Date.now("en-US")).toLocaleString();
	var now = new Date();
	now.setMinutes(now.getMinutes() + 30);
	now = new Date(now).toLocaleString();

	// save commande
	const isready = false;
	const canceled = false;
	const isDelivered = false;
	const underDelivery = false;
	fs.readFile(path.join(__dirname, "../data/commandes.json"), (err, data) => {
		const datas = JSON.parse(data);
		const numeroCommande = datas.length + 1;
		saveCommande({
			numeroCommande,
			restaurantId,
			restaurantName:restaurant.nom,
			id,
			nom,
			nombreRepas,
			rue,
			numMaison,
			numBoite,
			codePostal,
			commune,
			isready,
			canceled,
			isDelivered,
			date,
			delaiePrepa:now,
			underDelivery,
		});
		// Check for errors
		if (err) throw err;
		// Converting to JSON
		const commandes = JSON.parse(data);
		res.send(commandes);
	});
};

module.exports = createCommande;
