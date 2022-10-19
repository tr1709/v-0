import axios from "axios";
import React, {useEffect, useState } from "react";
import {Card, Container} from "react-bootstrap";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import { tabTitle } from "../utils/generalFunction";

const Livreurs = () => {
	tabTitle("Livreurs");
	const [livreurs, setLivreurs] = useState([]);
	const [selectedLivreur, setSelectedLivreur] = useState("");
	const [selectedCommande, setSelectedCommande] = useState("");
	const [restaurants, setRestaurants] = useState({});
	const [commandes, setCommandes] = useState([]);
	const [commande, setCommande] = useState([]);
	const [restaurant, setRestaurant] = useState([]);
	const [show, setShow] = useState([]);
	const [allCommandeByResto, setAllCommandeByResto] = useState([]);

	const getLivreurs = async () => {
		const { data } = await axios.get(`http://localhost:5000/api/livreurs`);
		try {
			setLivreurs(data);
		} catch (error) {
			console.log(error);
		}
	};
	const getRestaurantWaiting = async () => {
		const { data } = await axios.get(
			`http://localhost:5000/api/waiting-deliver`
		);
		try {
			setRestaurants(data);
		} catch (error) {
			console.log(error);
		}
	};
	const getCommandes = async () => {
		const { data } = await axios.get(
			`http://localhost:5000/api/restaurant-commande-waiting`
		);
		try {
			setCommandes(data);
		} catch (error) {
			console.log(error);
		}
	};
	const getCommande = async (id) => {
		const { data } = await axios.get(
			`http://localhost:5000/api/get-a-commande/${id}`
		);
		try {
			setCommande(data);
		} catch (error) {
			console.log(error);
		}
	};
	const savingLivreur = (e) => {
		localStorage.setItem("livreur", JSON.stringify(e.target.value));
		const saved = localStorage.getItem("livreur");
		const initialValue = JSON.parse(saved);
		setSelectedLivreur(initialValue);
	};
	useEffect(() => {
		getLivreurs();
		getRestaurantWaiting();
		getCommandes();
		const saved = localStorage.getItem("livreur");
		const initialValue = JSON.parse(saved);
		setSelectedLivreur(initialValue);
		const interval = setInterval(() => {
			getLivreurs();
			getRestaurantWaiting();
			getCommandes();
		}, 10000);
		return () => clearInterval(interval);
	}, []);
	const handleClose = () => {
		setShow(show);
	};
	const handleShow = (res) => {
		setShow(true);
		setRestaurant(res);
	};
	return (
		<Container className="mt-3 py-5">
			<Card.Title>Livreurs</Card.Title>
			<select
				className="form-select"
				aria-label="Default select example"
				value={selectedLivreur}
				onChange={(e) => savingLivreur(e)}
			>
				<option disabled>Choisissez votre nom</option>
				{livreurs.length > 0 &&
					livreurs.map((livreur, key) => (
						<option key={key} value={livreur.name}>
							{livreur.name}
						</option>
					))}
			</select>
			{selectedLivreur !== "" &&
				restaurants.length > 0 &&
				restaurants.map((res, key) => (
					<table className="table table-hover mt-5" key={key}>
						<thead>
							<tr>
								<th>{res.nom}</th>
								<th>Numero de la commande </th>
								<th>Date de création</th>
								<th>Date de préparation</th>
							</tr>
						</thead>
						<tbody>
							{restaurants.length > 0 &&
								commandes.map((commande, key) => (
									<tr key={key}>
										{commande.restaurantId === res.id &&
											commande.isready === true &&
											commande.underDelivery === false &&
											commande.isDelivered === false &&
											commande.canceled === false && (
												<>
													<td></td>
													<td> {commande.numeroCommande}</td>
													<td>{commande.date}</td>
													<td>{commande.preparer}</td>
												</>
											)}
									</tr>
								))}
						</tbody>
					</table>
				))}
			{selectedLivreur !== "" &&
				restaurants.length > 0 && (
					<Container fluid="md" className="mt-3">
						<Card.Title>Map</Card.Title>
						<div id="map">
							{restaurants.length > 0 && (
								<MapContainer
									center={[
										restaurants[0].lat,
										restaurants[0]?.lon,
									]}
									zoom={15}
									scrollWheelZoom={false}
								>
									<TileLayer
										attribution='&copy; <Link to="https://www.openstreetmap.org/copyright">OpenStreetMap</Link> contributors'
										url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
									/>
									{restaurants.map((place, key) => (
										<Marker
											key={key}
											position={[place.lat, place.lon]}
											title={place.name}
										>
											<Popup>
												{[place.nom, <br />, place.address]} <br />
												<h6>
													(
													{
														commandes.filter(
															(item) =>
																item.canceled === false &&
																item.isDelivered === false &&
																item.restaurantId ===
																	place.id &&
																item.restaurantId !== -1
														).length
													}
													). commande(s) a livrer
												</h6>
												<Link
													to={`/livrer/${selectedLivreur}/${place.id}`}
												>
													Livrer
												</Link>
											</Popup>
										</Marker>
									))}
								</MapContainer>
							)}
						</div>
					</Container>
				)}
		</Container>
	);
};

export default Livreurs;
