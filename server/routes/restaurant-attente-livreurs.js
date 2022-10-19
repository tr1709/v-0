const fs = require("fs");
const path = require("path");

module.exports = restaurantWaiting = (req, res) => {
	const id = req.params.id;
	fs.readFile(path.join(__dirname, "../data/commandes.json"), (err, data) => {
		// Check for errors
		if (err) throw err;
		// Converting to JSON
		const datas = JSON.parse(data);
		const underDelivery = datas.filter(
			(commande) => commande.underDelivery === false
		);
		fs.readFile(
			path.join(__dirname, "../data/restaurants.json"),
			(err, data) => {
				// Check for errors
				if (err) throw err;
				// Converting to JSON
				let restaurants = [];
				const datas = JSON.parse(data);
				for (let index = 0; index < underDelivery.length; index++) {
					const element = underDelivery[index].restaurantId;
					const restaurant = datas.filter((resto) => resto.id === element);
					const existingItem = restaurants.find(
						(restau) => restau.id === element
					);
					if (!existingItem) {
						restaurants.push(restaurant[0]);
					}
				}
				res.send(restaurants);
			}
		);
	});
};
