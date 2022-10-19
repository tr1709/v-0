import { Component } from 'react';
import FormDetails from './FormDetails';
import Confirmation from './Confirmation';


export class Formulaire extends Component {
    state = {
        step: 1,
        nom: '',
        nombreRepas: '',
        rue: '',
        numMaison: '',
        numBoite: '',
        codePostal: '',
        commune: '',
    };

    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step : step + 1
        });
    };

    prevStep = () => {
        const { step } = this.state
        this.setState({
            step : step - 1
        });
    };

    inputChange = input => e => {
        this.setState({[input]: e.target.value});
    };

    render(){
        const {step} = this.state;
        const {nom, nombreRepas, rue, numMaison, numBoite, codePostal, commune} = this.state;
        const values = {nom, nombreRepas, rue, numMaison, numBoite, codePostal, commune};
        // eslint-disable-next-line default-case
        switch(step) {
        case 1:
            return (
                <FormDetails
                    nextStep={this.nextStep}
                    inputChange = {this.inputChange}
                    values={values}
                  />
            );

            case 2: 
            return (

                <Confirmation
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    values={values}
                />
            );
        
        }
    }
}

export default Formulaire;