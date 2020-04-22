package com.knbs.carsservice.web;

import com.knbs.carsservice.dao.CarRepository;
import com.knbs.carsservice.entities.Car;
import com.knbs.carsservice.service.FileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DefaultRestController {
    @Autowired
    public CarRepository carRepository;

    @Autowired
    private FileService fileService;

    @GetMapping("/checkCar/{carId}")
    public int checkCar(@PathVariable String carId){
    	Long id = Long.parseLong(carId);
        int res = 0;
    	if(carRepository.existsById(id)) {
    		 res = 1;
        }
        return res ;
    }
   
    @GetMapping("/picture/car/{idCar}")
    @ResponseBody
    public ResponseEntity<Resource> downloadFile(@PathVariable String idCar) {
        Car c = carRepository.getCarById(Long.parseLong(idCar));
        Resource resource = fileService.loadAsResource(c.getPicture());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
  
}