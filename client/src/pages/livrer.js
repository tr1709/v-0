import axios from "axios";
import React, {useEffect, useState } from "react";
import { Button, Card, Container, Modal } from "react-bootstrap";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { useNavigate, useParams } from "react-router-dom";
import { tabTitle } from "../utils/generalFunction";

const Livrer = () => {
	tabTitle('Livrer')
	const [livreurs, setLivreurs] = useState([]);
	const [livreur, setLivreur] = useState([]);
	const [places, setPlaces] = useState([]);
	const [commandes, setCommandes] = useState([]);
	const [numCommande, setNumCommande] = useState([]);
	const [commande, setCommande] = useState([]);
	const [restaurant, setRestaurant] = useState([]);
	const [show, setShow] = useState(false);
	const [error, setError] = useState([]);
	const [nb, setNb] = useState(0);
	const params = useParams();
	const navigate = useNavigate();
	const { id } = params;
	const getplaces = () => {
		axios
			.get("http://localhost:5000/api/restaurants")
			.then((result) => {
				setPlaces(result.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const checkCommande = () => {
		const { id, livreur } = params;
		const num = parseInt(numCommande);
		console.log(livreur);
		axios
			.post(`http://localhost:5000/api/is-commande/${id}`, { num, livreur })
			.then((result) => {
				// setState({ commande: result.data });
				if (result.data.nom === undefined) {
					setError("error");
				}
				if (result.data.nom) {
					navigate(`/client/${result.data.id}`);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleClose = () => {
		setShow(true);
	};
	const handleShow = (res) => {
		setShow(true);
		setRestaurant(res);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		// checkCommande();
	};
	useEffect(() => {
		getplaces();
		setNb(commandes.length);
	}, []);

	return (
		<Container className="mt-3 py-5">
			{places.length > 0 &&
				places.map((place, key) => (
					<div key={key}>
						{place.id === id && (
							<div>
								<Card.Title>
									<span>{place.nom}</span>
									<p>{place.address}</p>
								</Card.Title>
								<div>
									<MapContainer
										center={[place.lat, place.lon]}
										zoom={15}
										scrollWheelZoom={false}
									>
										<TileLayer
											attribution='&copy; <Link to="https://www.openstreetmap.org/copyright">OpenStreetMap</Link> contributors'
											url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
										/>
										<Marker
											key={place.id}
											position={[place.lat, place.lon]}
											title={place.name}
										>
											<Popup>
												{[place.nom, <br />, place.address]}{" "}
												<Button
													variant="outline-success"
													size="sm"
													onClick={() => handleShow()}
												>
													Enlever une commande 
												</Button>
											</Popup>
										</Marker>
									</MapContainer>
								</div>
							</div>
						)}
					</div>
				))}
			<Modal show={show} onHide={() => handleClose()}>
				<Modal.Header closeButton></Modal.Header>
				<form onSubmit={onSubmit}>
					<Modal.Body>
						<>
							Veuillez entrer le numero de la commande
							<div className="form-outline">
								<input
									id="typeNumber"
									className="form-control"
									required
									onChange={(e) => setNumCommande(e.target.value)}
								/>
							</div>
							<br />
							{error === "error" && (
								<div className="alert alert-danger" role="alert">
									Numero de commande invalide, veuillez réessayer!
								</div>
							)}
						</>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="outline-success"
							onClick={() => checkCommande()}
						>
							Confirmer
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</Container>
	);
};

export default Livrer;
