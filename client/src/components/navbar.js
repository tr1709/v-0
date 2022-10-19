import React from "react";
import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Navabr = () => {
	return (
		<Navbar bg="light" expand={false} className="py-4">
			<Container fluid>
				<LinkContainer to="/">
					<Navbar.Brand>Bienvenue</Navbar.Brand>
				</LinkContainer>
				<Navbar.Toggle aria-controls="offcanvasNavbar" />
				<Navbar.Offcanvas
					id="offcanvasNavbar"
					aria-labelledby="offcanvasNavbarLabel"
					placement="end"
				>
					<Offcanvas.Header closeButton>
						<Offcanvas.Title id="offcanvasNavbarLabel">
							Bienvenue
						</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<Nav className="justify-content-end flex-grow-1 pe-3">
							<LinkContainer to="/">
								<Nav.Link>Home</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/employe">
								<Nav.Link>Employe</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/livreurs">
								<Nav.Link>Livreurs</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/gestionnaire">
								<Nav.Link>Gestionnaire</Nav.Link>
							</LinkContainer>
						</Nav>
					</Offcanvas.Body>
				</Navbar.Offcanvas>
			</Container>
		</Navbar>
	);
};

export default Navabr;
