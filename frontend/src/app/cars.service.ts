import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private host:string="http://localhost:8080/api-cars/"
  private carsUrl:string= this.host+"cars/"
  private token:string 
  constructor(private authService:AuthenticationService,private http:HttpClient) {
      this.token = authService.getToken();
  }

  getAllCars(){
    if(this.token == null) this.token = this.authService.getToken();
    return this.http.get(this.carsUrl,
      {headers:new HttpHeaders(
        {'Authorization':this.token}
      )});
   }
  
  getCar(idCar){
    if(this.token == null) this.token = this.authService.getToken();
    return this.http.get(this.carsUrl+idCar,
      {headers:new HttpHeaders(
        {'Authorization':this.token}
      )});
  }

  addCar(car){
    if(this.token == null) this.token = this.authService.getToken();
    return this.http.post(this.carsUrl,car,
      {headers:new HttpHeaders(
        {'Authorization':this.token}
      )});
  }

  getCarPicture(id){
    return this.host+"picture/car/"+id;
  }

  deleteCar(idCar){
    if(this.token == null) this.token = this.authService.getToken();
    return this.http.delete(this.carsUrl+idCar,
      {headers:new HttpHeaders(
        {'Authorization':this.token}
      )});
  }

  editCar(idCar,car){
    if(this.token == null) this.token = this.authService.getToken();
    return this.http.put(this.carsUrl+idCar,car,
      {headers:new HttpHeaders(
        {'Authorization':this.token}
      )});
  }

}
