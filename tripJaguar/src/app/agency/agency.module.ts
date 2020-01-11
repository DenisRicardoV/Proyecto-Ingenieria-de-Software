import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AgencyRoutingModule } from './agency-routing.module';
import { ToursListComponent } from './tours-list/tours-list.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { ToursDetailComponent } from './tours-detail/tours-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AgencyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [ToursListComponent, HomeComponent, ToursDetailComponent],
  exports:[AgencyRoutingModule]
})
export class AgencyModule { }
