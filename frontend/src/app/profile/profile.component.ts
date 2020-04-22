import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../authentication.service';
import { RentsService } from '../rents.service';
import { CarsService } from '../cars.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    closeResult: string;
    userInfo : any;
    userName : string;
    rents : any
    count : any
    constructor(private modalService: NgbModal,private router:Router,private carsService:CarsService,private rentService:RentsService,private authService:AuthenticationService) {}

    open(content, type, modalDimension) {
        if (modalDimension === 'sm' && type === 'modal_mini') {
            this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
                this.closeResult = 'Closed with: $result';
            }, (reason) => {
                this.closeResult = 'Dismissed $this.getDismissReason(reason)';
            });
        } else if (modalDimension === '' && type === 'Notification') {
          this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
              this.closeResult = 'Closed with: $result';
          }, (reason) => {
              this.closeResult = 'Dismissed $this.getDismissReason(reason)';
          });
        } else {
            this.modalService.open(content,{ centered: true }).result.then((result) => {
                this.closeResult = 'Closed with: $result';
            }, (reason) => {
                this.closeResult = 'Dismissed $this.getDismissReason(reason)';
            });
        }
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  'with: $reason';
        }
    }

    ngOnInit() {
        this.authService.controlAccess("user-profile");
        this.userName = this.authService.getCurrentUserName();
        this.authService.getUser(this.userName).subscribe(
            resp=>{
            var R =  JSON.parse(JSON.stringify(resp))
            this.userInfo = R
            },
              err=>{
                  //alert( "Unable to reach gateway api");
              })

         this.rentService.getUserOrders(this.userName).subscribe(
            resp=>{
                this.rents = resp
                var count = 0;
                for (var k in this.rents) {
                    if (this.rents.hasOwnProperty(k)) {
                         ++count;
                    }
                }
                this.count = count
            },
              err=>{
                  alert( err.message);
              })
    }

    onSubmit(dataForm){
        console.log(dataForm)
        this.authService.editUserInfo(dataForm).subscribe(
            resp=>{
                location.reload();
            },
            err=>{
                alert(err.message);
            })
    }
}
