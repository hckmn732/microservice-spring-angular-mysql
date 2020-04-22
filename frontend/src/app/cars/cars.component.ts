import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { CarsService } from '../cars.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars : any
  constructor(private router:Router,private carsService:CarsService,private authService:AuthenticationService) { }

  ngOnInit(): void {
    this.authService.controlAccess("cars");
    this.carsService.getAllCars().subscribe(
      data=>{
        var obj = JSON.parse(JSON.stringify(data));
        this.cars =  obj._embedded.cars
      }, err =>{
        if(err.status == 500 || err.status == 404 ){
          alert("Service cars not reachable");
        }else{
          this.authService.logout();
          this.router.navigateByUrl('/login');
        }
      }
    )
  }
}
