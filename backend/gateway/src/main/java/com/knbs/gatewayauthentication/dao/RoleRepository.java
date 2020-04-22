package com.knbs.gatewayauthentication.dao;
import org.springframework.data.jpa.repository.JpaRepository;

import com.knbs.gatewayauthentication.entities.AppRole;

public interface RoleRepository extends JpaRepository<AppRole,Long>{
   public AppRole findByRoleName(String rolename);
}