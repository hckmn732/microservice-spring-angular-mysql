package com.knbs.gatewayauthentication.service;

import com.knbs.gatewayauthentication.entities.AppRole;
import com.knbs.gatewayauthentication.entities.AppUser;

public interface AccountService {
 public AppUser saveUser(AppUser user);
 public AppRole saveRole(AppRole user);
 public void addUserToRole(String username, String rolename);
 public void removeUserToRole(String username, String rolename);
 public AppUser findUserByUsername(String username);
}