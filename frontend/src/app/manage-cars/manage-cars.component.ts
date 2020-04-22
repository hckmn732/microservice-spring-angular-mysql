import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CarsService } from '../cars.service';
import { AuthenticationService } from '../authentication.service';
import { RentsService } from '../rents.service';

@Component({
  selector: 'app-manage-cars',
  templateUrl: './manage-cars.component.html',
  styleUrls: ['./manage-cars.component.css']
})
export class ManageCarsComponent implements OnInit {
  closeResult: string;
  userInfo : any;
  userName : string;
  cars : any
  count : any
  selectedFile : File = null 

  @ViewChild('defaultEdit')
  private defaultEdit : TemplateRef<any>

  //imput for edit value
  brand: string;
  model: ElementRef;
  color: ElementRef;
  plateNumber: ElementRef;
  price: ElementRef;
  description: ElementRef;
  idcar: ElementRef;
  

  constructor(private modalService: NgbModal,private router:Router,private carsService:CarsService,private rentService:RentsService,private authService:AuthenticationService) { }

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


  ngOnInit(): void {
    this.authService.controlAccess("manage-cars");
    this.carsService.getAllCars().subscribe(
      data=>{
        var obj = JSON.parse(JSON.stringify(data));
        this.cars =  obj._embedded.cars
      }, err =>{
        if(err.status == 500){
          alert("Service cars not reachable");
        }else{
          this.authService.logout();
          this.router.navigateByUrl('/login');
        }
      }
    )
  }

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0]
  }
  
  onSubmit(dataForm,id=null,uploadImage=true){
    var data = new FormData();
    data.append("brand", dataForm.brand);
    data.append("model", dataForm.model);
    data.append("color", dataForm.color);
    data.append("plateNumber", dataForm.plateNumber);
    data.append("price", dataForm.price);
    data.append("description", dataForm.description);
    if(uploadImage){
      data.append("image", this.selectedFile,this.selectedFile.name);
    }
    if(id!=null){
      this.carsService.editCar(id,data).subscribe(
        resp=>{
            location.reload();
        },
        err=>{
            alert(err.message);
        })
    }else{
      this.carsService.addCar(data).subscribe(
        resp=>{
            location.reload();
        },
        err=>{
            alert(err.message);
        })
    }
    
  }

  deleteCar(id){
    var r = confirm("Delete car "+id+ " ?");
    if (r == true) {
      this.carsService.deleteCar(id).subscribe(
        resp=>{
          location.reload();
        },
        err=>{
            alert(err.message);
        })
    }
    }

    editCar(id){
      var carInfo 
      this.cars.forEach(element => {
        if(element.id == id){
          carInfo = element;
        }  
      });

      this.brand = carInfo.brand
      this.model = carInfo.model
      this.color = carInfo.color
      this.idcar = carInfo.id
      this.plateNumber = carInfo.plateNumber
      this.price = carInfo.price
      this.description = carInfo.description
      this.open(this.defaultEdit,'' , '');
    }

    onSubmitEdit(dataForm){
      var ui = false;
      if(dataForm.image){
        ui = true
      }
      this.onSubmit(dataForm,dataForm.id,ui)
    }
  }

