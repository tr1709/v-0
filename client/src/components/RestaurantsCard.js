import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const RestaurantsCard = () => {
	const [places, setPlaces] = useState([]);

	const getplaces = async () => {
		const {data} = await axios.get("http://localhost:5000/api/restaurants");
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
		<Container className="mt-3 py-5">
			<Card.Title>Restaurants</Card.Title>
			<Row xs={1} md={2} className="g-4">
				{places.length > 0 &&
					places.map((place) => (
						<Col key={place.id}>
							<Card>
								<Card.Img variant="top" src={place.cover} />
								<Card.Body>
									<Card.Title>{place.nom}</Card.Title>
									<Card.Title>
										<span>Menu du jour : </span>
										{place.menuDujour.nom}
									</Card.Title>
									<Card.Text>
										<span>Ingredients : </span>
										{place.menuDujour.ingredients}
									</Card.Text>
									<Link to={`/commande/restaurant/${place.id}`}>
										<Button variant="outline-secondary" size="md">
											Commander
										</Button>
									</Link>
								</Card.Body>
							</Card>
						</Col>
					))}
			</Row>
		</Container>
	);
};
export default RestaurantsCard;
