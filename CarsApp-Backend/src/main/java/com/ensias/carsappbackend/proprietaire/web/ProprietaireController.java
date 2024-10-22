package com.ensias.carsappbackend.proprietaire.web;

import com.ensias.carsappbackend.proprietaire.Proprietaire;
import com.ensias.carsappbackend.proprietaire.repo.ProprietaireRepository;
import com.ensias.carsappbackend.voiture.Voiture;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/proprietaires")
public class ProprietaireController {

    @Autowired
    private ProprietaireRepository proprietaireRepo;

    // Get all proprietaires
    @GetMapping
    public Iterable<Proprietaire> getAllProprietaires() {
        return proprietaireRepo.findAll();
    }

    // Get a single proprietaire by ID
    @GetMapping("/{id}")
    public ResponseEntity<Proprietaire> getProprietaireById(@PathVariable Long id) {
        return proprietaireRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create a new proprietaire
    @PostMapping
    public Proprietaire createProprietaire(@RequestBody Proprietaire proprietaire) {
        return proprietaireRepo.save(proprietaire);
    }

    // Update an existing proprietaire
    @PutMapping("/{id}")
    public ResponseEntity<Proprietaire> updateProprietaire(@PathVariable Long id, @RequestBody Proprietaire proprietaireDetails) {
        return proprietaireRepo.findById(id)
                .map(proprietaire -> {
                    proprietaire.setNom(proprietaireDetails.getNom());
                    proprietaire.setPrenom(proprietaireDetails.getPrenom());
                    Proprietaire updatedProprietaire = proprietaireRepo.save(proprietaire);
                    return ResponseEntity.ok(updatedProprietaire);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete a proprietaire
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteProprietaire(@PathVariable Long id) {
        return proprietaireRepo.findById(id)
                .map(proprietaire -> {
                    proprietaireRepo.delete(proprietaire);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Get all voitures associated with a specific proprietaire ID
    @GetMapping("/{id}/voitures")
    public ResponseEntity<List<Voiture>> getVoituresByProprietaireId(@PathVariable Long id) {
        return proprietaireRepo.findById(id)
                .map(proprietaire -> ResponseEntity.ok(proprietaire.getVoitures()))
                .orElse(ResponseEntity.notFound().build());
    }
}
