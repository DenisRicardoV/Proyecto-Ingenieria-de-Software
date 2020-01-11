import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthAgencyGuard } from '../auth/guard/auth-agency.guard';
import { HomeComponent } from './home/home.component';
import { ToursListComponent } from './tours-list/tours-list.component';
import { ToursDetailComponent } from './tours-detail/tours-detail.component';

const agencyRoutes: Routes = [
  {
    path : 'agencia',
    // canActivate:[AuthAgencyGuard],
    component:HomeComponent,
    children: [
      {
        path:'',
        canActivateChild:[AuthAgencyGuard],
        children:[
          {
            path:'tours' ,
            children:[
              {path: '',pathMatch: 'full',redirectTo: 'list'},
              { path:'list' , component:ToursListComponent},
              { path:'nuevo' , component:ToursDetailComponent}
            ]
          }
        ]


      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(agencyRoutes)],
  exports: [RouterModule]
})
export class AgencyRoutingModule { }
