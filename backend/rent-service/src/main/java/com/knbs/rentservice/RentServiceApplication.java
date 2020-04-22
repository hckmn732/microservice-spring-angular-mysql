package com.knbs.rentservice;

import com.knbs.rentservice.entities.Rent;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

@SpringBootApplication
public class RentServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(RentServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner start (RepositoryRestConfiguration rrc){
		return args -> {
			rrc.exposeIdsFor(Rent.class);
		} ;
	}
}
