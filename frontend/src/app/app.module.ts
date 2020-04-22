import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { LoginComponent } from './login/login.component';
import { RentProcessingComponent } from './rent-processing/rent-processing.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ManageCarsComponent } from './manage-cars/manage-cars.component';
import { ManageRentsComponent } from './manage-rents/manage-rents.component';
import { CarsComponent } from './cars/cars.component';
import { AuthenticationService } from './authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './logout/logout.component';
import { CarsService } from './cars.service';
import { RentsService } from './rents.service';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RentProcessingComponent,
    ConfirmationComponent,
    ManageCarsComponent,
    ManageRentsComponent,
    CarsComponent,
    LogoutComponent,
    ManageRolesComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthenticationService,RentsService,CarsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
