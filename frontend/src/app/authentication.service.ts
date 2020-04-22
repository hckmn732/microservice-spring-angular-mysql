import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private host:string="http://localhost:8080"
  private jwtToken;
  private roles:Array<any>

  constructor(private http:HttpClient,private route:Router) {

  }

  editUserInfo(userInfo){
    return this.http.post(this.host+"/editUser",userInfo,
    {headers:new HttpHeaders(
      {'Authorization':this.jwtToken}
    )})
  }
  
  editUserRoles(data){
    return this.http.post(this.host+"/editUserRoles",data,
    {headers:new HttpHeaders(
      {'Authorization':this.jwtToken}
    )})
  }
  
  getToken(){
    return this.jwtToken;
  }

  login(user){
      return this.http.post(this.host+"/login",user,{observe: 'response'})
  }

  register(user){
    return this.http.post(this.host+"/register",user,{observe: 'response'})
  }

  saveToken(jwt:string){
    this.jwtToken = jwt;
    localStorage.setItem('token',jwt);
    this.loadRoles();
  }

  getUser(username){
    return this.http.get(this.host+"/getUser/"+username,
    {headers:new HttpHeaders(
      {'Authorization':this.jwtToken}
    )})
  }

  getAllUser(){
    return this.http.get(this.host+"/users/",
    {headers:new HttpHeaders(
      {'Authorization':this.jwtToken}
    )})
  }

  getCurrentUserName(){
    this.loadToken();
    let jwtHelper = new JwtHelper();
    var token = this.jwtToken.split(" ");
    return jwtHelper.decodeToken(token[1]).sub;
  }

  loadRoles(){
     this.loadToken();
     let jwtHelper = new JwtHelper();
     var token = this.jwtToken.split(" ");
     this.roles = jwtHelper.decodeToken(token[1]).roles;
   }

   loadToken(){
    this.jwtToken = localStorage.getItem('token')
   }

   logout(){
     localStorage.removeItem('token');
     this.jwtToken = null;
   }

   isLogged(){
    let res = false;
    this.loadToken();
    if(this.jwtToken != null){
      res = true;
    }
    return res;
   }

   isAdmin(){
     for(let r of this.roles){
       if(r.authority=='ADMIN') return true;
     }
     return false
  }


  controlAccess(page_title){
    console.log(page_title);
    if(page_title=="manage-rents" || page_title=="manage-cars" || page_title=="manage-roles"){
      if(!this.isAdmin()){
        this.route.navigateByUrl("/cars");
      }
    }else{
      if(this.isAdmin()){
        this.route.navigateByUrl("/manage-cars");
      }
    }
  }

}
