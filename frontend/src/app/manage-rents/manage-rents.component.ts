import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RentsService } from '../rents.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-manage-rents',
  templateUrl: './manage-rents.component.html',
  styleUrls: ['./manage-rents.component.css']
})
export class ManageRentsComponent implements OnInit {

  rents :any;
  constructor(private router:Router,private rentService:RentsService,private authService:AuthenticationService) { }

  ngOnInit(): void {
    this.authService.controlAccess("manage-rents");
    this.rentService.getAllOrder().subscribe(
      resp=>{
          this.rents = resp
          
      },
        err=>{
            alert( err.message);
        })
  }

  onChange(newStatus,idRent) {
    var rent 
    this.rents.forEach(element => {
        if(element.id == idRent){
          rent = element;
        }  
    });
    rent.status = newStatus;
    this.rentService.updateRent(idRent,rent).subscribe(
      resp=>{
        alert("ORDERS ID = "+idRent + " STATUS UPDATED");
      },
      err=>{
          alert(err.message);
      }
    )
}
}
