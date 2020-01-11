import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  estadoMenu:boolean = true;
  public global:any;

  constructor() { }

  ngOnInit() {

  }

  habilitar(){
    this.estadoMenu =  !this.estadoMenu;
  }

  showHide(){
      return this.estadoMenu  === true ? 'show':'hide';
  }


}
