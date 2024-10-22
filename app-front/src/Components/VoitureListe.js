import React, { Component } from 'react';
import { Button, ButtonGroup, Card, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faList, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import MyToast from './myToast';
import {Link} from "react-router-dom"; // Assurez-vous que cela correspond à votre nom de fichier (sensible à la casse)

export default class VoitureListe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voitures: [],
            show: false,
            message: "",
            type: "danger" // Ajout d'un état pour le type de notification
        };
    }

    // Récupération des données après le montage du composant
    componentDidMount() {
        this.fetchVoitures();
    }

    fetchVoitures = () => {
        axios.get("http://localhost:8080/api/voitures")
            .then(response => {
                console.log(response.data); // Log des données de réponse
                this.setState({ voitures: response.data }); // Mettre à jour l'état avec les données récupérées
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des voitures:", error);
            });
    }

    deleteVoiture = (id) => {
        axios.delete(`http://localhost:8080/api/voitures/${id}`)
            .then(response => {
                console.log("Réponse de la suppression :", response); // Log de la réponse
                this.fetchVoitures(); // Rafraîchir la liste des voitures
                this.setState({
                    show: true,
                    message: "Voiture supprimée avec succès",
                    type: "success" // Type de toast pour succès
                });

                setTimeout(() => this.setState({ show: false }), 3000); // Masquer le toast après 3 secondes
            })
            .catch(error => {
                console.error("Erreur lors de la suppression de la voiture:", error);
                this.setState({
                    show: true,
                    message: "Erreur lors de la suppression de la voiture",
                    type: "danger" // Type de toast pour erreur
                });

                setTimeout(() => this.setState({ show: false }), 3000); // Masquer le toast après 3 secondes
            });
    }

    render() {
        return (
            <div>
                {/* Notification de toast */}
                <div style={{ display: this.state.show ? "block" : "none" }}>
                    <MyToast children={{ show: this.state.show, message: this.state.message, type: this.state.type }} />
                </div>

                <Card className="border border-dark bg-light text-black">
                    <Card.Header>
                        <FontAwesomeIcon icon={faList} /> Liste des Voitures
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="light">
                            <thead>
                            <tr>
                                <th>Marque</th>
                                <th>Modele</th>
                                <th>Couleur</th>
                                <th>Immatricule</th> {/* Nouvelle colonne pour l'immatriculation */}
                                <th>Annee</th>
                                <th>Prix</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.voitures.length === 0 ? (
                                <tr align="center">
                                    <td colSpan="7">Aucune voiture disponible.</td>
                                </tr>
                            ) : (
                                this.state.voitures.map((voiture) => (
                                    <tr key={voiture.id}>
                                        <td>{voiture.marque}</td>
                                        <td>{voiture.modele}</td>
                                        <td>{voiture.couleur}</td>
                                        <td>{voiture.immatricule}</td> {/* Affichage de l'immatriculation */}
                                        <td>{voiture.annee}</td>
                                        <td>{voiture.prix}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"edit/"+voiture.id} className="btn btn-sm btn-outline-primary">
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Link>{' '}
                                                <Button size="sm" variant="outline-danger" onClick={() => this.deleteVoiture(voiture.id)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}