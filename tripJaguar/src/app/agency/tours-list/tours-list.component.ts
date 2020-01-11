import { Component, OnInit } from '@angular/core';
import { ToursService, Tour } from 'src/app/core/services/tours.service';

@Component({
  selector: 'app-tours-list',
  templateUrl: './tours-list.component.html',
  styleUrls: ['./tours-list.component.css']
})
export class ToursListComponent implements OnInit {
  tours:Tour[];
  constructor(
    private tourService:ToursService
  ) { 

    this.tourService.getAll().subscribe(res=>{
      console.log('Iniciando RESS', res);
      this.tours = res;
    });
    
  }

  ngOnInit() {
  }

}
