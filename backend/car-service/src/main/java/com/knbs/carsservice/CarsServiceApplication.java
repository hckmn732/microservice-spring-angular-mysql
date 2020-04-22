package com.knbs.carsservice;

import com.knbs.carsservice.entities.Car;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

@SpringBootApplication
public class CarsServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CarsServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner start (RepositoryRestConfiguration rrc){
		return args -> {
			rrc.exposeIdsFor(Car.class);
		} ;
	}
}
