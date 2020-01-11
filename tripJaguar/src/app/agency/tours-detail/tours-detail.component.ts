import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ActividadesService } from 'src/app/core/services/actividades.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Tour, ToursService } from 'src/app/core/services/tours.service';
import { doesNotThrow } from 'assert';
import { NotifierService } from 'angular-notifier';
import { HttpEventType, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { DepartamentoService } from 'src/app/core/services/departamento.service';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-tours-detail',
  templateUrl: './tours-detail.component.html',
  styleUrls: ['./tours-detail.component.css']
})

export class ToursDetailComponent implements OnInit {
  todo = [];
  done = [];
  itinerarios = [];
  imagenes: File[]=[];
  departamentos=[];

  itinerario = {descripcion:[],nombre:''};
  descripcion:string;




  tourForm:FormGroup;
  tour: Tour;

  passConfirm:string;
  submitted:boolean = false;
  intento:boolean = false;
  notifier: NotifierService;

  //mensaje
  mensajeLoading:string;
  loadingPorcent=0;


  animal: string;
  name: string;
  constructor(
    notifierService: NotifierService,
    private actividadService :ActividadesService,
    private tourService: ToursService,
    private departamentoService:DepartamentoService,
    public dialog: MatDialog
  ) {

    this.notifier = notifierService;
    this.actividadService.getAll().subscribe(res=>{
      this.todo = res;

    });

    this.departamentoService.getAll().subscribe(res =>{
      this.departamentos = res;
    });

   }

   openDialog(): void {
    const dialogRef = this.dialog.open(null, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  ngOnInit() {
    this.createForm();

  }
  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
     if ((new Date().getTime() - start) > milliseconds) {
      break;
     }
    }
   }

  createForm(){

    this.tourForm = new FormGroup({
      'nombre': new FormControl(null,[Validators.required]),
      'descripcion': new FormControl('',[Validators.required]),
      'dias': new FormControl(null,[Validators.required]),
      'horas': new FormControl(null,[Validators.required]),
      'precio': new FormControl(null,[Validators.required]),
      'departamento': new FormControl(null,[Validators.required])
    });

  }

  addDescripcion(){

    this.itinerario.descripcion.push(this.descripcion);
    this.descripcion = '';
  }
  addItinerario(){
    this.itinerarios.push(this.itinerario);
    this.itinerario = {descripcion:[],nombre:''};
  }

  onImagenes(files){
    this.imagenes = files;
  }

  registrarTour(){


    this.mensajeLoading = "Registrando Tours ...";
    this.animar(0,5,0);
    this.tourService.registrar(this.tour).then(succes=>{
      this.mensajeLoading = "Guardando Fotos ...";
      this.animar(5,20,5);
      this.animar(20,50,20);

      // this.imagenes.forEach(file => {
      //   this.uploadFile(file, succes.uid);
      // });

      this.notifier.notify('success', succes.message)
      this.tourForm.reset();
      this.done = [];
      this.imagenes = [];
      this.itinerarios = [];
      this.intento = false;

      this.submitted = false;
    },error=>{
      this.notifier.notify( 'error',error.message );
    });
  }


  onSubmit() {
    this.intento=true;
    // stop here if form is invalid
    if (this.tourForm.invalid) {
        return;
    }
    if(this.done.length==0){
      return;
    }
    if(this.imagenes.length ==0){

      return;
    }
    if(this.itinerarios.length==0){
      return;
    }
    this.submitted = true;

    var aux:any;
    aux = Object.assign({}, this.tourForm.value);
    aux.itinerarios = this.itinerarios;
    aux.actividades = this.done;

    this.tour = aux;

    this.registrarTour();

  }

  uploadFile(file, uuid) {
    const formData = new FormData();
    console.log("UPLOAD FORM:", file.data);
    formData.append('file', file);
    this.tourService.upload(formData).then(succes=>{

    },error=>{

    });
  }

  animar(inicio, fin,estado){
    this.loadingPorcent = estado
    for (let index = inicio; index < fin; index++) {
      this.loadingPorcent++;
      this.sleep(50);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }


}
