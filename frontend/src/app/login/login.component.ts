import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  constructor(private router:Router,private authService:AuthenticationService) { }

  mode:number=0;
  message:string;
  ngOnInit(): void {
    if(this.authService.isLogged()){
      this.router.navigateByUrl('/cars');
    }
  }

  onSubmit(dataForm){
    this.authService.login(dataForm)
      .subscribe( resp=>{
        let jwtToken = resp.headers.get('authorization');
        this.authService.saveToken(jwtToken)
        this.router.navigateByUrl('/cars');
      },
      err=>{
        this.mode = 1
        if(err.status == 0){
          this.message = "Unable to reach gateway api"
        }else{
          this.message = "Bad credentials"
        }
      })
  }

}
