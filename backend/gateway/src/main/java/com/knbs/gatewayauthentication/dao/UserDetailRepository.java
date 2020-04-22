package com.knbs.gatewayauthentication.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

import com.knbs.gatewayauthentication.entities.UserDetail;

public interface UserDetailRepository extends JpaRepository<UserDetail,Long> {
    @Override
    default Optional<UserDetail> findById(Long id) {
        // TODO Auto-generated method stub
        return null;
    }
}
