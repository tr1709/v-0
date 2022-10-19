import axios from "axios";
import React, {useEffect, useState } from "react";
import { Button, Card, Container, Modal } from "react-bootstrap";
import { tabTitle } from "../utils/generalFunction";

const Gestionnaire = () => {
	tabTitle("Gestionnaire");
	const [places, setPlaces] = useState([]);
	const [commandes, setCommandes] = useState([]);
	const [allAprepa, setAllprepa] = useState([]);
	const [enCoursLivraison, setEnCoursLivraison] = useState([]);
	const [isDelivered, setIsDelivered] = useState([]);
	const [delivered, setDelivered] = useState([]);
	const [id, setId] = useState("");
	const [enAttentLivreur, setEnAttentLivreur] = useState([]);
	const [show, setShow] = useState(false);
	const [showVider, setShowVider] = useState(false);
	const [selectedCommande, setSelectedCommande] = useState("");
	const [selectedCommandeDetails, setSelectedCommandeDetails] = useState({});
	const [commandeApreparer, setCommandeApreparer] = useState([]);
	const [date, setDate] = useState(
		new Date(Date.now("en-US")).toLocaleString()
	);

	const nombreApreparer = allAprepa.reduce((a, b) => +a + +b.nombreRepas, 0);
	const nombreEnAttente = enAttentLivreur.reduce(
		(a, b) => +a + +b.nombreRepas,
		0
	);
	const nombreEnCours = enCoursLivraison.reduce(
		(a, b) => +a + +b.nombreRepas,
		0
	);
	const nombreLivrer = delivered.reduce((a, b) => +a + +b.nombreRepas, 0);
	const getplaces = async () => {
		const { data } = await axios.get("http://localhost:5000/api/restaurants");
		try {
			setPlaces(data);
		} catch (error) {
			console.log(error);
		}
	};
	const getCommandes = async () => {
		const { data } = await axios.get(
			`http://localhost:5000/api/get-all-commande`
		);
		try {
			setCommandes(data);
		} catch (error) {
			console.log(error);
		}
	};
	const allApreparer = async () => {
		const { data } = await axios.get(
			`http://localhost:5000/api/all-a-apreparer`
		);
		try {
			setAllprepa(data);
		} catch (error) {
			console.log(error);
		}
	};
	const allEnAttenteLivreur = async () => {
		const { data } = await axios.get(
			`http://localhost:5000/api/all-en-attente-livreur`
		);
		try {
			setEnAttentLivreur(data);
		} catch (error) {
			console.log(error);
		}
	};
	const allDelivered = async () => {
		const { data } = await axios.get(
			`http://localhost:5000/api/all-delivered`
		);
		try {
			setDelivered(data);
		} catch (error) {
			console.log(error);
		}
	};
	const allEnCoursLivraison = async () => {
		const { data } = await axios.get(
			`http://localhost:5000/api/all-en-cours-livraison`
		);
		try {
			setEnCoursLivraison(data);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteAllComandes = async () => {
		await axios.post(`http://localhost:5000/api/erase-commandes`);
		try {
			setCommandes([]);
			setShowVider(false);
			getCommandes();
			allApreparer();
			allEnAttenteLivreur();
		} catch (error) {
			console.log(error);
		}
	};
	const cancelCommande = async () => {
		await axios.put(
			`http://localhost:5000/api/cancel-commande/${selectedCommande}`
		);
		try {
			handleClose();
			getCommandes();
			allApreparer();
			allEnAttenteLivreur();
			allEnCoursLivraison();
			allDelivered();
		} catch (error) {}
	};

	const handleClose = () => {
		setShow(false);
	};
	const handleShow = (id) => {
		setShow(true);
		setSelectedCommande(id);
	};
	const handleCloseVider = () => {
		setShowVider(false);
	};
	const handleShowVider = () => {
		setShowVider(true);
	};
	useEffect(() => {
		console.log(id)
		getCommandes();
		allApreparer();
		allEnAttenteLivreur();
		allEnCoursLivraison();
		allDelivered();
		getplaces();
		const interval = setInterval(() => {
			getCommandes();
			allApreparer();
			allEnAttenteLivreur();
			allEnCoursLivraison();
			allDelivered();
			getplaces();
			setDate(new Date(Date.now("en-US")).toLocaleString());
		}, 10000);
		return () => clearInterval(interval);
	}, []);
	return (
		<Container className="mt-3 py-5">
			<Card.Title>Gestionnaire</Card.Title>
			<div className="mb-5 mt-3">
				<Card.Title>Tableau de statistique</Card.Title>
				<table className="table table-primary">
					<thead>
						<tr>
							<th>Nombre de repas a preparer</th>
							<th>Nombre de repas en attente</th>
							<th>Nombre de repas enleve</th>
							<th>Nombre de repas delivre</th>
							<th>Derniere mise a jour</th>
						</tr>
					</thead>
					<tbody>
						<tr className="table-light">
							<td>{nombreApreparer}</td>
							<td>{nombreEnAttente}</td>
							<td>{nombreEnCours}</td>
							<td>{nombreLivrer}</td>
							<td>{date}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className="mb-5 mt-3">
				<Card.Title>Liste des commandes</Card.Title>
				<table className="table table-primary">
					<thead>
						<tr>
							<th>Numero</th>
							<th>Nombre de repas</th>
							<th>Adresse</th>
							<th>Restaurant</th>
							<th>Date de creation</th>
							<th>Date de preparation</th>
							<th>Date de commande enlevée</th>
							<th>Date de livraison</th>
							<th>Livreur</th>
							<th>Etat</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{commandes.length > 0 &&
							commandes
								.slice(0)
								.reverse()
								.map((commande) => (
									<tr className="table-light"key={commande.id}>
										<td>{commande.numeroCommande}</td>
										<td>{commande.nombreRepas}</td>
										<td>{commande.rue}</td>
										<td>{commande.restaurantName}</td>
										<td>{commande.date}</td>
										<td>{commande.preparer}</td>
										<td>{commande.enleverLe}</td>
										<td>{commande.livréLe}</td>
										<td>{commande.livreur}</td>
										<td>
											{commande.canceled === false &&
												commande.isready === true &&
												commande.underDelivery === true && (
													<span className="badge badge-success">
														en cours
													</span>
												)}
											{commande.canceled === true && (
												<span className="badge badge-danger">
													canceled
												</span>
											)}
											{commande.isready === true &&
												commande.underDelivery === false &&
												commande.isDelivered === true && (
													<span className="badge badge-success">
														delivered
													</span>
												)}
										</td>
										<td>
											{" "}
											{commande.canceled === false &&
												commande.isDelivered === false && (
													<Button
														variant="outline-danger"
														size="sm"
														className="ml-2 "
														onClick={() =>
															handleShow(commande.id)
														}
													>
														cancel
													</Button>
												)}
										</td>
									</tr>
								))}
					</tbody>
				</table>
			</div>
			<Modal show={show} onHide={() => handleClose()}>
				<Modal.Header closeButton></Modal.Header>
				<Modal.Body>Voulez-vous annuler la commande ?</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-danger" onClick={() => handleClose()}>
						Annuler
					</Button>
					<Button
						variant="outline-success"
						onClick={() => cancelCommande()}
					>
						Confirmer
					</Button>
				</Modal.Footer>
			</Modal>
			<Modal show={showVider} onHide={() => handleCloseVider()}>
				<Modal.Header closeButton></Modal.Header>
				<Modal.Body>Voulez-vous vider la pile de commandes ?</Modal.Body>
				<Modal.Footer>
					<Button
						variant="outline-danger"
						onClick={() => handleCloseVider()}
					>
						Annuler
					</Button>
					<Button
						variant="outline-success"
						onClick={() => deleteAllComandes()}
					>
						Confirmer
					</Button>
				</Modal.Footer>
			</Modal>
			<Button variant="outline-danger" onClick={() => handleShowVider()}>
				Vider la pile de commandes
			</Button>
		</Container>
	);
};

export default Gestionnaire;
