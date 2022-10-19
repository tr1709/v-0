const fs = require("fs");
const path = require("path");
const commandes = require("../data/commandes.json");

module.exports = eraseCommandes = (req, res, next) => {
	fs.writeFile(
		path.join(__dirname, "../data/commandes.json"),
		JSON.stringify([]),
		(err) => {
			// Checking for errors
			if (err) throw err;
			console.log("successfully deleted"); // Success
      res.send({})
		}
    
	);
};
