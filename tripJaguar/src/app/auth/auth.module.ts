import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';

import { NotifierModule } from 'angular-notifier';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { RegisterDetailComponent } from './register-detail/register-detail.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AuthRoutingModule,
    SharedModule,
    NotifierModule
  ],
  declarations: [LoginComponent, RegisterComponent, RegisterDetailComponent],
  exports : [AuthRoutingModule,CommonModule,NotifierModule],
  providers: []
})
export class AuthModule { }
