package com.knbs.gatewayauthentication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.knbs.gatewayauthentication.dao.RoleRepository;
import com.knbs.gatewayauthentication.dao.UserRepository;
import com.knbs.gatewayauthentication.entities.AppRole;
import com.knbs.gatewayauthentication.entities.AppUser;

@Service
@Transactional
public class AccountServiceImpl implements AccountService{
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public AppUser saveUser(AppUser user){
        String hashpass = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(hashpass);
        return userRepository.save(user);
    }
    
    public AppRole saveRole(AppRole role){
      return roleRepository.save(role);
    }

    public void addUserToRole(String username, String rolename){
        AppRole role = roleRepository.findByRoleName(rolename);
        AppUser user = userRepository.findByUsername(username);
        user.getRoles().add(role);
    }

    public void removeUserToRole(String username, String rolename){
        AppRole role = roleRepository.findByRoleName(rolename);
        AppUser user = userRepository.findByUsername(username);
        user.getRoles().remove(role);
    }

    public AppUser findUserByUsername(String username){
        return userRepository.findByUsername(username);
    }
}