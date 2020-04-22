package com.knbs.gatewayauthentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.knbs.gatewayauthentication.dao.UserDetailRepository;
import com.knbs.gatewayauthentication.entities.AppRole;
import com.knbs.gatewayauthentication.entities.AppUser;
import com.knbs.gatewayauthentication.entities.UserDetail;
import com.knbs.gatewayauthentication.service.AccountService;

@SpringBootApplication
@EnableZuulProxy
@EnableEurekaClient
public class GatewayAuthenticationApplication implements CommandLineRunner {

	@Autowired
	private AccountService accountService;
	
	@Autowired
	private UserDetailRepository userDetailRepository;
	
	public static void main(String[] args) {
		SpringApplication.run(GatewayAuthenticationApplication.class, args);
	}
	
	@Bean
	public BCryptPasswordEncoder getBCPE(){
		return  new BCryptPasswordEncoder();
	}

	@Override
	public void run(String... arg0) throws Exception{
		AppUser user = accountService.findUserByUsername("user");
        if(user==null) {
        	accountService.saveUser(new AppUser(null,"admin","123",null));
        	AppUser userS = new AppUser(null,"user","321",null);
        	UserDetail userDetail = new UserDetail(null, "kengobenito@gmail.com", "750398155", "France", "Ermont", "Place Courbet", "95120");
        	userDetailRepository.save(userDetail);
        	userS.setUserDetail(userDetail);
        	accountService.saveUser(userS);
        	accountService.saveRole(new AppRole(null,"ADMIN"));
        	accountService.saveRole(new AppRole(null,"USER"));
        	accountService.addUserToRole("admin","USER");
        	accountService.addUserToRole("admin","ADMIN");
        	accountService.addUserToRole("user","USER");		
        	
        }
        	    
	}
}
