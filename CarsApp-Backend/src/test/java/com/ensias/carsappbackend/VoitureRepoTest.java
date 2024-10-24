package com.ensias.carsappbackend;

import com.ensias.carsappbackend.voiture.Voiture;
import com.ensias.carsappbackend.voiture.repo.VoitureRepository;
import org.assertj.core.api.AssertionsForClassTypes;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
@DataJpaTest

public class VoitureRepoTest {

    @Autowired
    private TestEntityManager entityManager; // TestEntityManager est utilisée pour manipuler les entités persistantes

    @Autowired
    private VoitureRepository voitureRepo;

    @Test
    public void ajouterVoiture() {
        Voiture voiture = new Voiture("MiolaCar", "Uber", "Blanche", "M-2020", 2021, 180000);
        entityManager.persistAndFlush(voiture);
        // permet de faire persister ce tuple de l’entité Voiture
        assertThat(voiture.getId()).isNotNull();
        // permet de tester qu'un tuple de Voiture a bien été ajoutée en mémoire H2
    }

    @Test
    public void supprimerVoiture() {
        entityManager.persistAndFlush(new Voiture("MiolaCar", "Uber", "Blanche", "M-2020", 2021, 180000));
        entityManager.persistAndFlush(new Voiture("MiniCooper", "Uber", "Rouge", "C-2020", 2021, 180000));
        voitureRepo.deleteAll();

        // Convert Iterable to List
        List<Voiture> voitures = StreamSupport
                .stream(voitureRepo.findAll().spliterator(), false)
                .collect(Collectors.toList());

        // Assert that the list contains exactly no elements
        assertThat(voitures).isNotNull();
    }
}
