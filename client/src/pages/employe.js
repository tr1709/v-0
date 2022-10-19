import axios from "axios";
import React, {useEffect, useState } from "react";
import { Button, Card, Container, Modal } from "react-bootstrap";
import { tabTitle } from "../utils/generalFunction";

const Employe = () => {
	tabTitle('Employe')
	const [places, setPlaces] = useState([]);
	const [commandes, setCommandes] = useState([]);
	const [selectedRestaurant, setSelectedRestaurant] = useState("");
	const [underDelivery, setUnderDelivery] = useState([]);
	const [isDelivered, setIsDelivered] = useState([]);
	const [pendingDelivery, setPendingDelivery] = useState([]);
	const [show, setShow] = useState(false);
	const [selectedCommande, setSelectedCommande] = useState("");
	const [selectedCommandeDetails, setSelectedCommandeDetails] = useState({});
	const [commandeApreparer, setCommandeApreparer] = useState([]);
	const [date, setDate] = useState(
		new Date(Date.now("en-US")).toLocaleString()
	);
	const nombreApreparer = commandeApreparer?.reduce(
		(a, b) => +a + +b.nombreRepas,
		0
	);
	const nombreEnAttente = pendingDelivery?.reduce(
		(a, b) => +a + +b.nombreRepas,
		0
	);
	const nombreEnCours = underDelivery?.reduce(
		(a, b) => +a + +b.nombreRepas,
		0
	);

	const getplaces = async () => {
		const { data } = await axios.get("http://localhost:5000/api/restaurants");
		try {
			setPlaces(data);
			setShow(false);
		} catch (error) {
			console.log(error);
		}
	};
	const saveRestaurant = (e) => {
		localStorage.setItem("restaurant", JSON.stringify(e.target.value));
		const saved = localStorage.getItem("restaurant");
		const initialValue = JSON.parse(saved);
		setSelectedRestaurant(initialValue);
	};
	const getCommandes = async () => {
		if (selectedRestaurant !== "") {
			const { data } = await axios.get(
				`http://localhost:5000/api/get-commande-by-restaurant/${selectedRestaurant}`
			);
			try {
				setCommandes(data);
				setShow(false);
			} catch (error) {
				console.log(error);
			}
		}
	};
	const PendingDelivery = async (id) => {
		if (selectedRestaurant !== "") {
			const {data}  = await axios.get(
				`http://localhost:5000/api/get-commande-pending-delivery/${id}`
			);
			try {
				setPendingDelivery(data);
				setShow(false);
			} catch (error) {
				console.log(error);
			}
		}
	};
	const UnderDelivery = async (id) => {
		if (selectedRestaurant !== "") {
			const { data } = await axios.get(
				`http://localhost:5000/api/get-commande-under-delivery/${id}`
			);
			try {
				setUnderDelivery(data);
			} catch (error) {
				console.log(error);
			}
		}
	};

	const getCommande = async (id) => {
		const { data } = await axios.get(
			`http://localhost:5000/api/get-a-commande/${id}`
		);
		try {
			setSelectedCommandeDetails(data);
			// setShow(false);
		} catch (error) {
			console.log(error);
		}
	};
	const getApreparer = async (id) => {
		const { data } = await axios.post(
			`http://localhost:5000/api/a-preparer`,
			{ id }
		);
		try {
			setCommandeApreparer(data);
		} catch (error) {
			console.log(error);
		}
	};
	const handleClose = () => {
		setShow(false);
	};
	const handleShow = (id) => {
		setShow(true);
		setSelectedCommande(id);
		getCommande(id)
	};
	const commandeIsReady = async () => {
		await axios.put(
			`http://localhost:5000/api/is-commande-ready/${selectedCommande}`
		);
		try {
			getCommandes();
			getApreparer(selectedRestaurant);
			UnderDelivery(selectedRestaurant);
			PendingDelivery(selectedRestaurant);
			setShow(false);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		const saved = localStorage.getItem("restaurant");
		const initialValue = JSON.parse(saved);
		setSelectedRestaurant(initialValue);
		getplaces();
		getCommandes();
		getApreparer(selectedRestaurant);
		UnderDelivery(selectedRestaurant);
		PendingDelivery(selectedRestaurant);
		const interval = setInterval(() => {
			getCommandes();
			UnderDelivery(selectedRestaurant);
			PendingDelivery(selectedRestaurant);
			getApreparer(selectedRestaurant);
			setDate(new Date(Date.now("en-US")).toLocaleString());
		}, 10000);
		return () => clearInterval(interval);
	}, [selectedRestaurant]);

	return (
		<Container className="mt-3 py-5">
			<Card.Title>Restaurants</Card.Title>
			<select
				className="form-select"
				aria-label="Default select example"
				onChange={(e) => saveRestaurant(e)}
				value={selectedRestaurant}
			>
				<option defaultChecked disabled>
					Choisis ton restaurant
				</option>
				{places.length > 0 &&
					places.map((place, key) => (
						<option key={key} value={place.id}>
							{place.nom}
						</option>
					))}
			</select>
			<div className="mb-5 mt-3">
				<Card.Title>Tableau de statistique</Card.Title>
				<table className="table table-primary">
					<thead>
						<tr>
							<th>Nombre de repas a preparer</th>
							<th>Nombre repas en attente</th>
							<th>Nombre de repas enlevés</th>
							<th>derniere de mise a jour</th>
						</tr>
					</thead>
					<tbody>
						<tr className="table-light">
							<td>{nombreApreparer}</td>
							<td>{nombreEnAttente}</td>
							<td>{nombreEnCours}</td>
							<td>{date}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className="mb-5 mt-3">
				<Card.Title>Liste des commandes a preparer</Card.Title>
				<table className="table table-primary">
					<thead>
						<tr>
							<th>Nombre de repas</th>
							<th>Numero de la commande</th>
							<th>Date de creation</th>
							<th>Delai de preparation</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{commandes.length > 0 &&
							commandes.map(
								(commande) =>
									commande.isready === false &&
									commande.canceled === false && (
										<tr className="table-light" key={commande.id}>
											<td>{commande.nombreRepas}</td>
											<td>{commande.numeroCommande}</td>
											<td>{commande.date}</td>
											<td> {commande.delaiePrepa}</td>
											<td>
												<Button
													variant="outline-success"
													size="sm"
													onClick={() => handleShow(commande.id)}
												>
													prête
												</Button>
											</td>
										</tr>
									)
							)}
					</tbody>
				</table>
			</div>
			<Modal show={show} onHide={() => handleClose()}>
				<Modal.Header closeButton>
					<Modal.Title>
						Numero Commande : (
						{selectedCommandeDetails[0]?.numeroCommande})
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Nombre de repas : ({selectedCommandeDetails[0]?.nombreRepas})
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-danger" onClick={() => handleClose()}>
						annuler
					</Button>
					<Button
						variant="outline-success"
						onClick={() => commandeIsReady()}
					>
						confirmer
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
};

export default Employe;
