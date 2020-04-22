package com.knbs.carsservice.web;

import com.knbs.carsservice.dao.CarRepository;
import com.knbs.carsservice.entities.Car;
import com.knbs.carsservice.service.FileService;
import com.knbs.carsservice.wrapper.CarFormWapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.multipart.MultipartFile;

@RepositoryRestController
public class CarRestController {

    public CarRepository carRepository;

    @Autowired
    private FileService fileService;

    @Autowired
    public CarRestController (CarRepository repo) { 
        carRepository = repo;
    }

    
    @PostMapping("/cars")
    public ResponseEntity save(@ModelAttribute CarFormWapper carFormWapper){
        String brand = carFormWapper.getBrand();
        String model = carFormWapper.getModel();
        String color = carFormWapper.getColor();
        String plateNumber = carFormWapper.getPlateNumber() ;
        String description = carFormWapper.getDescription() ;
        double price = Double.parseDouble(carFormWapper.getPrice());
        Car c = new Car();
        c.setBrand(brand);
        c.setColor(color);
        c.setModel(model);
        c.setPlateNumber(plateNumber);
        c.setPrice(price);
        c.setDescription(description);
        MultipartFile file = carFormWapper.getImage();
        if(!(file.isEmpty())){
            fileService.store(file);
            c.setPicture(file.getOriginalFilename());
        }
        Car rest = carRepository.save(c);
        return ResponseEntity.status(HttpStatus.OK).body(rest);
    }

    @PutMapping("/cars/{id}")
    public ResponseEntity editCar(@PathVariable String id,@ModelAttribute CarFormWapper carFormWapper){
        Car c = carRepository.getOne(Long.parseLong(id));
        if(c==null){
            throw new RuntimeException("Error id car");
        }
        String brand = carFormWapper.getBrand();
        String model = carFormWapper.getModel();
        String color = carFormWapper.getColor();
        String plateNumber = carFormWapper.getPlateNumber() ;
        String description = carFormWapper.getDescription() ;
        double price = Double.parseDouble(carFormWapper.getPrice());
        c.setBrand(brand);
        c.setColor(color);
        c.setModel(model);
        c.setPlateNumber(plateNumber);
        c.setPrice(price);
        c.setDescription(description);
        MultipartFile file = carFormWapper.getImage();
        if(file != null){
            fileService.store(file);
            c.setPicture(file.getOriginalFilename());
        }
        Car rest = carRepository.save(c);
        return ResponseEntity.status(HttpStatus.OK).body(rest);
    }

    
}