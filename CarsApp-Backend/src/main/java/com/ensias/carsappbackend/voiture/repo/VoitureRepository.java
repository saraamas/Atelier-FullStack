package com.ensias.carsappbackend.voiture.repo;

import com.ensias.carsappbackend.voiture.Voiture;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface VoitureRepository extends CrudRepository<Voiture, Long> {

    // Sélectionnez les voitures par marque
    List<Voiture> findByMarque(String marque);
    // Sélectionnez les voitures par couleur
    List<Voiture> findByCouleur(String couleur);
    // Sélectionnez les voitures par année
    List<Voiture> findByAnnee(int annee);
    // Sélectionnez les voitures par marque et modele
    List<Voiture> findByMarqueAndModele(String marque, String modele);
    // Sélectionnez les voitures par marque ou couleur
    List<Voiture> findByMarqueOrCouleur(String marque, String couleur);
    // Sélectionnez les voitures par marque et trier par annee
    List<Voiture> findByMarqueOrderByAnneeAsc(String marque);
    // Sélectionnez les voitures par marque en utilisant SQL

    @Query("select v from Voiture v where v.marque like %?1")
    List<Voiture> findByMarqueEndsWith(String marque);

    List<Voiture> findByProprietaireId(Long proprietaireId);
}
