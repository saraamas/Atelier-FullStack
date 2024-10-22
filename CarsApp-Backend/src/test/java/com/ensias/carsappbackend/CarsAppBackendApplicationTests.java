package com.ensias.carsappbackend;

import com.ensias.carsappbackend.voiture.web.VoitureController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
class CarsAppBackendApplicationTests {


    @Autowired
    VoitureController voitureController;
    @Test
    //indique que cette méthode peut être exécutée comme un cas de test
    void contextLoads() {
        assertThat(voitureController).isNotNull();
    }


}
