import { Component } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { tabTitle } from "../utils/generalFunction";
export class FormDetails extends Component {
	continue = (e) => {
		e.preventDefault();
		this.props.nextStep();
	};

	render() {
		const { values, inputChange } = this.props;
		tabTitle('Commander')
		return (
			<Container className="mt-3 py-5">
				<form onSubmit={this.continue}>
					<div className="form-container mt-3 py-5">
					<h6 className="display-6 mb-3">Veuillez entrer vos informations</h6>
						<div className="form-group">
							<label htmlFor="validationDefault01">Nom</label>
							<input
								type="text"
								className="form-control"
								name="nom"
								onChange={inputChange("nom")}
								value={values.nom}
								id="validationDefault01"
								required
								pattern="[A-Za-z].{1,}"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="validationDefault02">
								Nombre de repas
							</label>
							<input
								type="number"
								className="form-control"
								min="1"
								max="20"
								name="nombreRepas"
								onChange={inputChange("nombreRepas")}
								value={values.nombreRepas}
								id="validationDefault02"
								required
							/>
						</div>

						<div className="form-group">
							<label htmlFor="validationDefault03">Rue</label>
							<input
								type="text"
								className="form-control"
								name="rue"
								onChange={inputChange("rue")}
								value={values.rue}
								id="validationDefault03"
								required
								pattern="[A-Za-z].{1,}"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="numMaison">Numero de maison</label>
							<input
								type="number, text"
								className="form-control"
								name="numMaison"
								onChange={inputChange("numMaison")}
								value={values.numMaison}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="numBoite">Numero de boite</label>
							<input
								type="number"
								min="0"
								className="form-control"
								name="numBoite"
								onChange={inputChange("numBoite")}
								value={values.numBoite}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="validationDefault05">Code postal</label>
							<input
								type="number"
								className="form-control"
								min="1000"
								max="9999"
								name="codePostal"
								onChange={inputChange("codePostal")}
								value={values.codePostal}
								id="validationDefault05"
								required
							/>
						</div>

						<div className="form-group">
							<label htmlFor="validationDefault04">Commune</label>
							<input
								type="text"
								className="form-control"
								name="commune"
								onChange={inputChange("commune")}
								value={values.commune}
								id="validationDefault04"
								required
							/>
						</div>
						<div className="row justify-content-between">
							<div className="col-4">
								<Button variant="outline-primary">
									<Link to="/">Retour</Link>
								</Button>
							</div>
							<div className="col-4 text-right">
								<Button
									variant="outline-secondary"
									size="md"
									type="submit"
								>
									S'enregistrer
								</Button>
							</div>
						</div>
					</div>
				</form>
			</Container>
		);
	}
}

export default FormDetails;
