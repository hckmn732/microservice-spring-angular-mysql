import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  private id:string;
  private userName:string;
  constructor(private routerActivated: ActivatedRoute, private router: Router,private authService:AuthenticationService) { }

  ngOnInit(): void {
    this.authService.controlAccess("confirmation");
    this.routerActivated.params.subscribe(params => {
      this.id = params['id']
    });
    this.userName = this.authService.getCurrentUserName();

    if(this.id == null){
        this.router.navigateByUrl('/car');
    }
  }

}
