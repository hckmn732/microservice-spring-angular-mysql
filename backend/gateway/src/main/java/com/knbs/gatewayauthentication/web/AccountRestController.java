package com.knbs.gatewayauthentication.web;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.knbs.gatewayauthentication.dao.RoleRepository;
import com.knbs.gatewayauthentication.dao.UserDetailRepository;
import com.knbs.gatewayauthentication.dao.UserRepository;
import com.knbs.gatewayauthentication.entities.AppRole;
import com.knbs.gatewayauthentication.entities.AppUser;
import com.knbs.gatewayauthentication.entities.UserDetail;
import com.knbs.gatewayauthentication.service.AccountService;
import com.knbs.gatewayauthentication.wrapper.WrapperUser;
import com.knbs.gatewayauthentication.wrapper.WrapperUserRole;

@RestController
public class AccountRestController {
    @Autowired
    private AccountService accountService;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private UserDetailRepository userDetailRepository;

    @Autowired
    private RoleRepository roleRepository;
    
    @PostMapping("/register")
    public AppUser register(@RequestBody WrapperUser userBody){
        AppUser user = accountService.findUserByUsername(userBody.getUsername());
        if(user!=null) throw new RuntimeException("The user already exist");
        user = new AppUser();
        UserDetail userDetail = new UserDetail(null,userBody.getEmail(),userBody.getPhoneNumber(),
        		userBody.getCountry(),userBody.getCity(),userBody.getAddress(),userBody.getZip());
        user.setUsername(userBody.getUsername());
        user.setPassword(userBody.getPassword());
        userDetailRepository.save(userDetail);
        user.setUserDetail(userDetail);
        accountService.saveUser(user);
        accountService.addUserToRole(user.getUsername(), "USER");
        return user;
    }

    @GetMapping("/users")
    public List<AppUser> getAllUsers(){
        return userRepository.findAll();
    }

    @PostMapping("/editUser")
    public UserDetail editUser(@RequestBody WrapperUser userBody){
        System.out.println(userBody.getUsername());
        System.out.println(userBody.getEmail());
        System.out.println(userBody.getPhoneNumber());
        AppUser user = accountService.findUserByUsername(userBody.getUsername());
        if(user==null) throw new RuntimeException("The user not exist");
        UserDetail userDetail = user.getUserDetail();
        userDetail.setEmail(userBody.getEmail());
        userDetail.setPhoneNumber(userBody.getPhoneNumber());
        userDetail.setCountry(userBody.getCountry());
        userDetail.setCity(userBody.getCity());
        userDetail.setAddress(userBody.getAddress());
        userDetail.setZip(userBody.getZip());
        return userDetailRepository.save(userDetail);
    }

    @PostMapping("/editUserRoles")
    public void editUserRoles(@RequestBody WrapperUserRole userRoles){
        AppUser user = userRepository.getOne(Long.parseLong(userRoles.getIdUser()));
        if(user==null) throw new RuntimeException("The user not exist");
        Collection<AppRole> roles = new ArrayList<>();
        if(Integer.parseInt(userRoles.getUser())  == 1){
            AppRole r = roleRepository.findByRoleName("USER");
            roles.add(r);
        }

        if(Integer.parseInt(userRoles.getAdmin())  == 1){
            AppRole r = roleRepository.findByRoleName("ADMIN");
            roles.add(r);
        }
        user.setRoles(roles);
        userRepository.save(user);
    }
    
    @DeleteMapping("/user/{user_id}")
    public void deleteUserById(@PathVariable String userId){
    	Long id = Long.parseLong(userId);
    	userRepository.deleteById(id);
    }
    
    @GetMapping("/getUser/{username}")
    public Map<String,String> getUser(@PathVariable String username){
    	AppUser user = userRepository.findByUsername(username);
        UserDetail userDetail = user.getUserDetail();
        Map<String,String> map = new HashMap<>();
    	if(user.getId() == null) {
            map.put("ERROR", "no user");
    	}
        map.put("id", ""+user.getId());
        map.put("userName", user.getUsername());
		map.put("email", userDetail.getEmail());
		map.put("phoneNumber", userDetail.getPhoneNumber());
		map.put("country",userDetail.getCountry());
		map.put("city", userDetail.getCity());
		map.put("address", userDetail.getAddress());
		map.put("zip", userDetail.getZip());
    	return map;
    }
    
    @GetMapping("/checkUser/{userName}")
    public int checkCar(@PathVariable String userName){
        AppUser user = accountService.findUserByUsername(userName);
        int res = 0;
        if(user!=null) {
    		 res = 1;
        }
        return res ;
    }


}