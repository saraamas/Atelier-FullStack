import React, { Component } from 'react';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import { faPlusSquare, faSave, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyToast from "./myToast"; // Importation de MyToast
import axios from 'axios'; // Assurez-vous d'importer axios si vous l'utilisez pour les requêtes HTTP

export default class Voiture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            marque: '',
            modele: '',
            couleur: '',
            immatricule: '',
            annee: '',
            prix: '',
            show: false, // État pour afficher le Toast
            message: '', // Message à afficher dans le Toast
            type: 'success' // Type de toast pour succès
        };

        // Lier les méthodes au contexte du composant
        this.voitureChange = this.voitureChange.bind(this);
        this.submitVoiture = this.submitVoiture.bind(this);
        this.resetVoiture = this.resetVoiture.bind(this);
    }

    // Méthode pour réinitialiser l'état
    resetVoiture() {
        this.setState({
            marque: '',
            modele: '',
            couleur: '',
            immatricule: '',
            annee: '',
            prix: '',
            show: false,
            message: '' // Réinitialiser le message du Toast
        });
    }

    // Méthode pour gérer la soumission du formulaire
    submitVoiture(event) {
        event.preventDefault(); // Empêche le rechargement de la page
        const voiture = {
            marque: this.state.marque,
            modele: this.state.modele,
            couleur: this.state.couleur,
            immatricule: this.state.immatricule,
            annee: this.state.annee,
            prix: this.state.prix
        };

        // Envoi des données à l'API
        axios.post("http://localhost:8080/api/voitures", voiture)
            .then(response => {
                console.log("Réponse de l'API :", response.data); // Vérifiez la réponse
                if (response.data != null) {
                    this.resetVoiture(); // Réinitialiser le formulaire après soumission
                    this.setState({
                        show: true,
                        message: "Voiture enregistrée avec succès", // Message de succès
                        type: "success" // Type de toast pour succès
                    }); // Afficher le Toast
                    setTimeout(() => {
                        this.setState({ show: false, message: '', type: 'success' }); // Masquer le Toast après 3 secondes
                    }, 3000);
                }
            })
            .catch(error => {
                console.error("Il y a eu une erreur lors de l'enregistrement de la voiture!", error);
                this.setState({
                    show: true,
                    message: "Erreur lors de l'enregistrement de la voiture.", // Message d'erreur
                    type: "danger" // Type de toast pour erreur
                }); // Afficher le Toast d'erreur
                setTimeout(() => {
                    this.setState({ show: false, message: '', type: 'danger' }); // Masquer le Toast après 3 secondes
                }, 3000);
            });
    }

    // Gestion de la saisie dans les champs du formulaire
    voitureChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const { marque, modele, couleur, immatricule, annee, prix, show, message, type } = this.state; // Décomposition des états

        return (
            <div>
                {/* Affichage du Toast uniquement lorsque show est true */}
                {show && (
                    <MyToast
                        show={show}
                        message={message}
                        type={type}
                    />
                )}

                <Card className="border border-dark bg-light text-black">
                    <Card.Header>
                        <FontAwesomeIcon icon={faPlusSquare}/> Ajouter Voiture
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={this.submitVoiture} id="VoitureFormId">
                            <Row>
                                <Form.Group as={Col} controlId="formGridMarque">
                                    <Form.Label>Marque</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="marque"
                                        className="bg-light text-black"
                                        placeholder="Entrez Marque Voiture"
                                        value={marque}
                                        onChange={this.voitureChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridModele">
                                    <Form.Label>Modèle</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="modele"
                                        className="bg-light text-black"
                                        placeholder="Entrez Modèle Voiture"
                                        value={modele}
                                        onChange={this.voitureChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridCouleur">
                                    <Form.Label>Couleur</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="couleur"
                                        className="bg-light text-black"
                                        placeholder="Entrez Couleur Voiture"
                                        value={couleur}
                                        onChange={this.voitureChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridImmatricule">
                                    <Form.Label>Immatricule</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="immatricule"
                                        className="bg-light text-black"
                                        placeholder="Entrez Immatricule"
                                        value={immatricule}
                                        onChange={this.voitureChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridAnnee">
                                    <Form.Label>Année</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        name="annee"
                                        className="bg-light text-black"
                                        placeholder="Entrez Année"
                                        value={annee}
                                        onChange={this.voitureChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPrix">
                                    <Form.Label>Prix</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        name="prix"
                                        className="bg-light text-black"
                                        placeholder="Entrez Prix"
                                        value={prix}
                                        onChange={this.voitureChange}
                                    />
                                </Form.Group>
                            </Row>
                        </Form>
                    </Card.Body>
                    {/* Boutons de soumission et de réinitialisation */}
                    <Card.Footer className="d-flex justify-content-end p-3">
                        <Button size="sm" variant="success" type="submit" form="VoitureFormId">
                            <FontAwesomeIcon icon={faSave} /> Submit
                        </Button>
                        <Button size="sm" variant="info" type="button" onClick={this.resetVoiture}>
                            <FontAwesomeIcon icon={faUndo} /> Reset
                        </Button>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}