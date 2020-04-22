package com.knbs.carsservice.dao;

import com.knbs.carsservice.entities.Car;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CarRepository extends JpaRepository<Car,Long> {
    @Query("SELECT h FROM Car h WHERE h.id=?1 ")
    public Car getCarById(Long id);
}