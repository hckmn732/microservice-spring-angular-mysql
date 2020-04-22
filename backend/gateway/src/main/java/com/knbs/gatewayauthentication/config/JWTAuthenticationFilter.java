package com.knbs.gatewayauthentication.config;

import java.io.IOException;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.knbs.gatewayauthentication.entities.AppUser;

import org.apache.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private AuthenticationManager authenticationMangager;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager){
        super();
        this.authenticationMangager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {

        AppUser appUser = null;
        try {
            appUser = new ObjectMapper().readValue(request.getInputStream(), AppUser.class);
            System.out.println("+++++++++++++++++++++++++"+appUser.getUsername());
        
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return authenticationMangager.authenticate(
            new UsernamePasswordAuthenticationToken(appUser.getUsername(), appUser.getPassword())
        );
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
            Authentication authResult) throws IOException, ServletException {
            User springUser = (User) authResult.getPrincipal();
            String jwtToken = Jwts.builder()
            .setSubject(springUser.getUsername())
            .setExpiration(
                new Date(System.currentTimeMillis()+SecurityConstants.EXPIRATION_TIME)
            )
            .signWith(SignatureAlgorithm.HS512,SecurityConstants.SECRET)
            .claim("roles", springUser.getAuthorities())
            .compact();

            response.addHeader(SecurityConstants.HEADER_STRING,SecurityConstants.TOKEN_PREFIX+jwtToken);
   }
}