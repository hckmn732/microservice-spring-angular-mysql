package com.knbs.rentservice.web;

import java.util.List;

import com.knbs.rentservice.dao.RentRepository;
import com.knbs.rentservice.entities.Rent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class DefaultController {

    @Autowired
    RentRepository repository;
    
    @RequestMapping(method =  RequestMethod.GET, value = "/getRent/{userName}") 
    public @ResponseBody List<Rent> getProducers(@PathVariable String userName) {
        return repository.findByUserName(userName); 
    }
}