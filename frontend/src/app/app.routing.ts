import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { RentProcessingComponent } from './rent-processing/rent-processing.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ManageCarsComponent } from './manage-cars/manage-cars.component';
import { ManageRentsComponent } from './manage-rents/manage-rents.component';
import { CarsComponent } from './cars/cars.component';
import { LogoutComponent } from './logout/logout.component';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';

const routes: Routes =[
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'register',           component: SignupComponent },
    { path: 'login',          component: LoginComponent },
    { path: 'logout',          component: LogoutComponent},
    { path: 'cars',          component: CarsComponent },
    { path: 'confirmation/:id',          component: ConfirmationComponent },
    { path: 'processing/:id',          component: RentProcessingComponent },
    { path: 'manage-cars',          component: ManageCarsComponent },
    { path: 'manage-rents',          component: ManageRentsComponent },
    { path: 'manage-roles',          component: ManageRolesComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
