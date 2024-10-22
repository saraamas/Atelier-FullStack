import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './Components/NavigationBar';
import Bienvenue from './Components/Bienvenue';
import Footer from './Components/Footer';
import Voiture from './Components/Voiture'; // Assurez-vous que le chemin est correct
import VoitureListe from './Components/VoitureListe'; // Assurez-vous que le chemin est correct

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marque: '',
      modele: '',
      couleur: '',
      annee: '',
      prix: ''
    };
  }

  submitVoiture = (event) => {
    alert(this.state.marque);
    event.preventDefault();
  };

  render() {
    const marginTop = { marginTop: "20px" };

    return (
        <Router>
          <div className="App">
            <NavigationBar />
            <Container>
              <Row>
                <Col lg={12} style={marginTop}>
                  <Routes>
                    <Route path="/" element={<Bienvenue />} />
                    <Route path="/add" element={<Voiture />} />
                    <Route path="/edit/:id" exact component={Voiture}/>
                    <Route path="/list" element={<VoitureListe />} />
                  </Routes>
                </Col>
              </Row>
            </Container>
            <Footer />
          </div>
        </Router>
    );
  }
}

export default App;