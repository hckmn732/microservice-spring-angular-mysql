import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
   constructor(private router:Router,private authService:AuthenticationService) { }

  errorField:number = 0
  mode:number=0;
  message:string;
  ngOnInit(): void {
  }

  onSubmit(dataForm){
   
    console.log(dataForm)
    if(dataForm.username=="" || dataForm.password=="" || dataForm.phoneNumber=="" || dataForm.country==""
     || dataForm.address=="" || dataForm.zip==""  || dataForm.email=="" ){
        this.errorField = 1
    }else{
        this.errorField = 0
    }
    if(this.errorField == 0){
        this.authService.register(dataForm).subscribe( resp=>{
          alert("ACCOUNT CREATED, NOW YOU CAN LOGIN")
          this.router.navigateByUrl('/login');
      },
      err=>{
        this.mode = 1
        if(err.status == 0){
          this.message = "Unable to reach gateway api"
        }else{
          this.message = "Bad credentials"
        }
      })
    }else{
        this.message = "Please, fill correctly all fields"
        this.mode = 1
    }
    
  }
}
