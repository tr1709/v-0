import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { tabTitle } from "../utils/generalFunction";

const Confirmation = ( props ) => {
	tabTitle('Confirmer votre commande')
	const {
		values: {
			nom,
			nombreRepas,
			rue,
			numMaison,
			numBoite,
			codePostal,
			commune,
		},
	} = props;

	const { id } = useParams();
	const navigate = useNavigate();
	const back = (e) => {
		e.preventDefault();
		props.prevStep();
	};

	const Continue = (e) => {
		e.preventDefault();
		const data = props.values;

		axios
			.post(`http://localhost:5000/api/commande/restaurant/${id}`, data)
			.then((result) => {
				if (result) {
					navigate("/");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div className="container mb-5 mt-3">
			<div className="card border-light mb-3">
				<div className="card-header">Veuillez confirmer votre commande</div>
				<div className="card-body">
					<p>Nom : {nom.trim()}</p>
					<p>Nombre de repas :{nombreRepas}</p>
					<p>Adresse : {numMaison} {rue.trim()}, {codePostal} {commune.trim()}</p>
					<p>Numero de Boite : {numBoite}</p>
					
					<div className="row">
						<div className="col-6 text-left">
							<Button variant="outline-danger" onClick={back}>
								Retour
							</Button>
						</div>

						<div className="col-6 text-right">
							<Button
								variant="outline-secondary"
								size="md"
								onClick={Continue}
							>
								Confirmer
							</Button>
						</div>
					</div>
				</div>
			</div>
			<MapContainer
				center={[50.8499, 4.3524]}
				zoom={15}
				className="mb-5 mt-3"
				scrollWheelZoom={false}
			>
				<TileLayer
					attribution='&copy; <Link to="https://www.openstreetmap.org/copyright">OpenStreetMap</Link> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={[50.8499, 4.3524]}>
					<Popup>
					
						
						<span>Adresse : {rue} {numMaison}, {codePostal} {commune}</span>
						<br />
						<span>Numero de Boite : {numBoite}</span>
						<br />

					</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
};

export default Confirmation;
