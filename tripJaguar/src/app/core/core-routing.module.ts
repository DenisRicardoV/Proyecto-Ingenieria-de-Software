import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ToursDetailComponent } from './tours/tours-detail/tours-detail.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path:'tours/detalle/:id', component:ToursDetailComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
