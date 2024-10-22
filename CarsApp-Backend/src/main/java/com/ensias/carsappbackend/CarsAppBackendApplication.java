package com.ensias.carsappbackend;

import com.ensias.carsappbackend.proprietaire.Proprietaire;
import com.ensias.carsappbackend.proprietaire.repo.ProprietaireRepository;
import com.ensias.carsappbackend.voiture.repo.VoitureRepository;
import org.antlr.v4.runtime.misc.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import com.ensias.carsappbackend.voiture.Voiture;

@SpringBootApplication
public class CarsAppBackendApplication {


    public static void main(String[] args) {
        SpringApplication.run(CarsAppBackendApplication.class, args);
    }

}
