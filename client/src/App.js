import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Restaurant from "./pages/Restaurant";
import Formulaire from "./pages/Formulaire";
import Navabr from "./components/navbar";
import Login from "./pages/employe";
import Livreurs from "./pages/livreurs";
import Gestionnaire from "./pages/gestionnaire";
import Livrer from "./pages/livrer";
import Client from "./pages/client";

function App() {
	return (
		<div>
			<Navabr />
			<Routes>
				<Route exact path="/" element={<Restaurant />} />
				<Route
					exact
					path="/commande/restaurant/:id"
					element={<Formulaire />}
				/>
				<Route exact path="/employe" element={<Login />} />
				<Route exact path="/livreurs" element={<Livreurs />} />
				<Route exact path="/gestionnaire" element={<Gestionnaire />} />
				<Route exact path="/livrer/:livreur/:id" element={<Livrer />} />
				<Route exact path="/client/:id" element={<Client />} />
			</Routes>
		</div>
	);
}

export default App;
