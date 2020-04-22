package com.knbs.gatewayauthentication.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.knbs.gatewayauthentication.entities.AppUser;

public interface UserRepository extends JpaRepository<AppUser,Long>{
  public AppUser findByUsername(String username);
}