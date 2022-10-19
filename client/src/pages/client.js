import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate, useParams } from "react-router-dom";
import { tabTitle } from "../utils/generalFunction";

const Client = () => {
	tabTitle('Client')
	const [commande, setCommande] = useState([]);
	const [show, setShow] = useState(false);
	const { id } = useParams();
	const navigate = useNavigate();

	const getCommande = () => {
		axios
			.get(`http://localhost:5000/api/get-a-commande/${id}`)
			.then((result) => {
				setCommande(result.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const commandeLivre = () => {
		axios
			.post(`http://localhost:5000/api/commande-livre/${id}`)
			.then((result) => {
				if (result.data.nom) {
					navigate(`/livreurs`);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	useEffect(() => {
		getCommande();
	}, []);
	const handleClose = () => {
		setShow(false);
	};
	const handleShow = (res) => {
		setShow(true);
	};
	return (
		<Container className="mt-3 py-5">
			{commande.length > 0 && (
				<div className="card border-light mb-3">
					<div className="card-header">
						Détails de la commande à livrer
					</div>
					<div className="card-body">
						<p>Nom : {commande[0].nom}</p>
						<p>Nombre de repas : {commande[0].nombreRepas}</p>
						<p>Adresse : {commande[0].numMaison} {commande[0].rue}, {commande[0].codePostal} {commande[0].commune} </p>
				        <p>Numero de Boite : {commande[0].numBoite}</p>
					</div>
				</div>
			)}

			{commande.length > 0 && (
				<MapContainer
					center={[50.8499, 4.3524]}
					zoom={15}
					scrollWheelZoom={false}
				>
					<TileLayer
						attribution='&copy; <Link to="https://www.openstreetmap.org/copyright">OpenStreetMap</Link> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<Marker
						position={[50.8499, 4.3524]}
						title={commande[0].numMaison}
					>
						<Popup>
					
							
							<span>Adresse : {[commande[0].numMaison]} {[commande[0].rue]}, {[commande[0].codePostal]} {[commande[0].commune]}</span>
							<br />
							<span>Numero de Boite : {[commande[0].numBoite]}</span>
							<br />
							
							<button
								type="button"
								class="btn btn-outline-success btn-sm"
								onClick={() => handleShow()}
							>
								Confirmer
							</button>
						</Popup>
					</Marker>
				</MapContainer>
			)}
			<Modal show={show} onHide={() => handleClose()}>
				<Modal.Header closeButton></Modal.Header>
				<form>
					<Modal.Body>Veuillez confirmer !</Modal.Body>
					<Modal.Footer>
						<Button
							variant="outline-success"
							onClick={() => commandeLivre()}
						>
							Confirmer
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</Container>
	);
};

export default Client;
