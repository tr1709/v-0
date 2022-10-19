import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card, Container } from "react-bootstrap";

const Map = () => {
	const [places, setPlaces] = useState([]);

	const getplaces = async () => {
		const {data} = await axios.get("http://localhost:5000/api/restaurants")
		try {
			setPlaces(data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getplaces();
	}, []);
	return (
		<Container fluid="md" className="mt-3">
			<Card.Title>Map</Card.Title>
			<div id="map">
				{places.length > 0 && (
					<MapContainer
						center={[places[0].lat, places[0]?.lon]}
						zoom={15}
						scrollWheelZoom={false}
					>
						<TileLayer
							attribution='&copy; <Link to="https://www.openstreetmap.org/copyright">OpenStreetMap</Link> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						{places.map((place) => (
							<Marker
								key={place.id}
								position={[place.lat, place.lon]}
								title={place.name}
							>
								<Popup>
									{[place.nom, <br />, place.address]} <br />
									<Link to={`/commande/restaurant/${place.id}`}>
										Commander maintenant
									</Link>
								</Popup>
							</Marker>
						))}
					</MapContainer>
				)}
			</div>
		</Container>
	);
};

export default Map;
