import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterDetailComponent } from './register-detail/register-detail.component';
import { AuthGuard } from './guard/auth.guard';


const authRoutes: Routes = [
  {
    path : '',
    canActivate:[AuthGuard],
    children: [
      {
        path:'',
        canActivateChild:[AuthGuard],
        children:[
          {path: 'login', component: LoginComponent},
          {path: 'registrarse', component: RegisterComponent},
          {path: 'registrarse/:option',component: RegisterDetailComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports : [RouterModule]
})
export class AuthRoutingModule { }
