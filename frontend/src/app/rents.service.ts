import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RentsService {
  private host:string="http://localhost:8080/api-rent/"
  private token:string 
  constructor(private authService:AuthenticationService,private http:HttpClient) {
    this.token = authService.getToken();
  }

  getAllOrder(){
    if(this.token == null) this.token = this.authService.getToken();
    return this.http.get(this.host+"rents",
      {headers:new HttpHeaders(
        {'Authorization':this.token}
      )});
   }
  
  getUserOrders(username){
    if(this.token == null) this.token = this.authService.getToken();
    return this.http.get(this.host+"getRent/"+username,
      {headers:new HttpHeaders(
        {'Authorization':this.token}
      )});
  }

  countUserOrder(id){
    if(this.token == null) this.token = this.authService.getToken();
    return this.http.get(this.host+"count/"+id,
      {headers:new HttpHeaders(
        {'Authorization':this.token}
      )});
  }

  saveOrder(rent){
    if(this.token == null) this.token = this.authService.getToken();
    return this.http.post(this.host+"rents",rent,
      {headers:new HttpHeaders(
        {'Authorization':this.token}
      )});
  }

  updateRent(idCar,car){
    if(this.token == null) this.token = this.authService.getToken();
    return this.http.put(this.host+"rents/"+idCar,car,
      {headers:new HttpHeaders(
        {'Authorization':this.token}
      )});
  }

}
