import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.css']
})
export class ManageRolesComponent implements OnInit {
  users:any
  constructor(private router:Router,private authService:AuthenticationService) { }
  groups = ["ADMIN", "USERS"];
  selectedGroups = [];
  ngOnInit(): void {
    this.authService.controlAccess("manage-roles");
    this.authService.getAllUser().subscribe(
      
        resp=>{
          this.users = resp
          console.log(this.users);
      },
        err=>{
            alert( err.message);
        })
  }

  onSubmit(data){
    console.log(data);
  }

  hasAdminRole(id){
    var resp = false
    this.users.forEach(user => {
        if(user.id == id){
          for(let r of user.roles){
            if(r.roleName=='ADMIN') resp = true;
          }
        }  
    });    
    return resp;
  }

  onChange(roles,iduser) {
    console.log(roles);
    var user = "0";
    var admin = "0";
    for(let r of roles){
      if(r.label == "ADMIN"){
        admin ="0"
        if(r.selected){
          admin = "1"
        }
      }else{
        user ="0"
        if(r.selected){
          user = "1"
        }
      }
      
    }

    var data = '{"idUser":"'+iduser+'","user":"'+user+'","admin":"'+admin+'"}';
    data = JSON.parse(data);
    this.authService.editUserRoles(data).subscribe()
  }

  hasUserRole(id) {
    var resp = false
    this.users.forEach(user => {
        if(user.id == id){
          for(let r of user.roles){
            if(r.roleName=='USER') resp = true;
          }
        }  
    });
    return resp;
  }
}
