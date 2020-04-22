package com.knbs.rentservice.dao;


import java.util.List;

import com.knbs.rentservice.entities.Rent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface RentRepository extends JpaRepository<Rent,Long> {
   List<Rent> findByUserName(String userName);
}   