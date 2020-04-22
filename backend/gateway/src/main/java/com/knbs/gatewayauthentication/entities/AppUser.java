package com.knbs.gatewayauthentication.entities;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSetter;


@Entity
public class AppUser {
    @Id @GeneratedValue
    private Long id;
    public UserDetail getUserDetail() {
		return userDetail;
	}

	public void setUserDetail(UserDetail userDetail) {
		this.userDetail = userDetail;
	}

	@Column(unique=true)
    private String username;
    private String password;
    @ManyToMany(fetch=FetchType.EAGER)
    private Collection<AppRole> roles = new ArrayList<>();

    @OneToOne
    private UserDetail userDetail ;
    
    public AppUser() {
        super();
    }
    
    public AppUser(Long id,String username, String password,Collection<AppRole> roles) {
        super();
        this.id = id;
        this.username = username;
        this.password = password;
        this.roles = roles;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @JsonIgnore
    public String getPassword() {
        return this.password;
    }
    @JsonSetter
    public void setPassword(String password) {
        this.password = password;
    }

    public Collection<AppRole> getRoles() {
        return this.roles;
    }

    public void setRoles(Collection<AppRole> roles) {
        this.roles = roles;
    }

}