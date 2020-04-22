package com.knbs.rentservice.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.knbs.rentservice.dao.RentRepository;
import com.knbs.rentservice.entities.Rent;

@RepositoryRestController
public class RentController {

	@Autowired
	DiscoveryClient discoveryClient;
	
    private final RentRepository repository;

    @Autowired
    public RentController(RentRepository repo) { 
        repository = repo;
    }

    @RequestMapping(method =  RequestMethod.GET, value = "/rents") 
    public @ResponseBody List<Rent> getProducers() {
        return repository.findAll(); 
    }
    
    @RequestMapping(method = RequestMethod.POST , value = "/rents")
    public @ResponseBody Rent save(@RequestBody Rent rent) {
    	List<ServiceInstance> instancesCar = discoveryClient.getInstances("cars-service");
    	ServiceInstance test_ = instancesCar.get(0);
    	String hostname = test_.getHost();
    	int port = test_.getPort();
    	
    	List<ServiceInstance> instancesRent = discoveryClient.getInstances("gateway-authentication");
    	ServiceInstance si1 = instancesRent.get(0);
    	String hostnameG = si1.getHost();
    	int portG = si1.getPort();
    	
    	RestTemplate restTemplate = new RestTemplate();
    	String user_service_url = "http://" + hostnameG + ":" + portG +"/checkUser/"+rent.getUserName();
		String car_service_url = "http://" + hostname + ":" + port +"/checkCar/"+rent.getIdCar();
		ResponseEntity<String> response1 = restTemplate.getForEntity(car_service_url, String.class);
    	ResponseEntity<String> response = restTemplate.getForEntity(user_service_url, String.class);
    	String s = response.getBody();
		String s1 = response1.getBody();
		
        if(!(Integer.parseInt(s) == 1 || Integer.parseInt(s1) == 1)) {
        	throw new RuntimeException("no existing car or user to rent");
        }
        
    	return repository.save(rent);
    }

}