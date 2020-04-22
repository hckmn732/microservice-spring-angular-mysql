import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute ,Params} from '@angular/router';
import { CarsService } from '../cars.service';
import { AuthenticationService } from '../authentication.service';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { RentsService } from '../rents.service';

@Component({
  selector: 'app-rent-processing',
  templateUrl: './rent-processing.component.html',
  styleUrls: ['./rent-processing.component.css']
})
export class RentProcessingComponent implements OnInit {

  car : any;
  carId : string;
  userName : string;

  fromDate: NgbDate;
  toDate: NgbDate;
  hoveredDate: NgbDate;
  model1 : NgbDate;
  model2 : NgbDate;

  constructor(calendar: NgbCalendar,private activatedRoute: ActivatedRoute,private router:Router,private carsService:CarsService,private rentService:RentsService,private authService:AuthenticationService) { 
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  onSubmit(dataForm){
    var from = dataForm.from.year + "-" + dataForm.from.month + "-" + dataForm.from.day
    var to = dataForm.to.year + "-" + dataForm.to.month + "-" + dataForm.to.day
    var data = '{"id":"null","status":"NEW","idCar":"'+this.carId+'","userName":"'+this.userName+'","startDate":"'+from+'","endDate":"'+to+'"}';
    var obj = JSON.parse(data);
    this.rentService.saveOrder(obj)
      .subscribe( resp=>{
        var obj = JSON.parse(JSON.stringify(resp));
        this.router.navigateByUrl('/confirmation/'+obj.id);
      },
      err=>{
          alert( "Unable to reach gateway api");
      })
 }

  isRangeStart(date: NgbDate){
    return this.model1 && this.model2 && date.equals(this.model1);
  }
  isRangeEnd(date: NgbDate){
    return this.model1 && this.model2 && date.equals(this.model2);
  }
  isInRange(date: NgbDate){
    return date.after(this.model1) && date.before(this.model2);
  }
  isActive(date: NgbDate){
    return date.equals(this.model1) || date.equals(this.model2);
  }
  endDateChanged(date){
    if (this.model1 && this.model2 && (this.model1.year > this.model2.year || this.model1.year === this.model2.year && this.model1.month > this.model2.month || this.model1.year === this.model2.year && this.model1.month === this.model2.month && this.model1.day > this.model2.day )) {
      this.model1 = this.model2;
    }
  }
  startDateChanged(date){
    if (this.model1 && this.model2 && (this.model1.year > this.model2.year || this.model1.year === this.model2.year && this.model1.month > this.model2.month || this.model1.year === this.model2.year && this.model1.month === this.model2.month && this.model1.day > this.model2.day )) {
      this.model2 = this.model1;
    }
  }
  
  ngOnInit(): void {
    this.authService.controlAccess("rent-processing");
    this.activatedRoute.params.subscribe(params => {
      this.carId =  params['id']
    });
    this.userName = this.authService.getCurrentUserName();
    this.carsService.getCar(this.carId).subscribe(
      data=>{
        this.car = JSON.parse(JSON.stringify(data)); 
        console.log( this.car)
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

}
