import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, take, filter } from 'rxjs/operators';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:any;

  constructor(
    private auth: AuthService,
    private router:Router


  ) {
    this.user = this.auth.getDataUserSession();
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.user = this.auth.getDataUserSession();
    });

  }


  ngOnInit() {
  }

  salir(){
    this.auth.signOut().then(success=>{

      localStorage.removeItem('access_token');
      this.router.navigate(['/']);

    }).catch(erro=>{
      localStorage.removeItem('access_token');
      this.router.navigate(['/']);
    });
  }


}
