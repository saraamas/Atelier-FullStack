package com.ensias.carsappbackend.voiture.web;

import com.ensias.carsappbackend.voiture.Voiture;
import com.ensias.carsappbackend.voiture.repo.VoitureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/voitures")
@CrossOrigin(origins = "http://localhost:3000") // Allows requests from React frontend

public class VoitureController {

    @Autowired
    private VoitureRepository voitureRepo;

    // Get all voitures
    @GetMapping
    public Iterable<Voiture> getAllVoitures() {
        return voitureRepo.findAll();
    }

    // Get a single voiture by ID
    @GetMapping("/{id}")
    public ResponseEntity<Voiture> getVoitureById(@PathVariable Long id) {
        return voitureRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create a new voiture
    @PostMapping
    public Voiture createVoiture(@RequestBody Voiture voiture) {
        return voitureRepo.save(voiture);
    }

    // Update an existing voiture
    @PutMapping("/{id}")
    public ResponseEntity<Voiture> updateVoiture(@PathVariable Long id, @RequestBody Voiture voitureDetails) {
        return voitureRepo.findById(id)
                .map(voiture -> {
                    voiture.setMarque(voitureDetails.getMarque());
                    voiture.setModele(voitureDetails.getModele());
                    voiture.setCouleur(voitureDetails.getCouleur());
                    voiture.setImmatricule(voitureDetails.getImmatricule());
                    voiture.setAnnee(voitureDetails.getAnnee());
                    voiture.setPrix(voitureDetails.getPrix());
                    voiture.setProprietaire(voitureDetails.getProprietaire());
                    Voiture updatedVoiture = voitureRepo.save(voiture);
                    return ResponseEntity.ok(updatedVoiture);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete a voiture
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteVoiture(@PathVariable Long id) {
        return voitureRepo.findById(id)
                .map(voiture -> {
                    voitureRepo.delete(voiture);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Get all voitures by a specific proprietaire ID
    @GetMapping("/proprietaire/{proprietaireId}")
    public ResponseEntity<List<Voiture>> getVoituresByProprietaireId(@PathVariable Long proprietaireId) {
        List<Voiture> voitures = voitureRepo.findByProprietaireId(proprietaireId);
        return ResponseEntity.ok(voitures);
    }

    // Count the number of voitures
    @GetMapping("/count")
    public ResponseEntity<Long> countVoitures() {
        long count = voitureRepo.count();
        return ResponseEntity.ok(count);
    }
}
