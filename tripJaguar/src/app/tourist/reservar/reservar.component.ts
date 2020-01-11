import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotifierService } from 'angular-notifier';
import { ReservarService } from './reservar.service';
import { AgencyService } from 'src/app/core/services/agency.service';
import { ToursService } from 'src/app/core/services/tours.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {
  isLinear = false;
  submitted:boolean = false;
  isFormTurista:boolean = true;
  notifier: NotifierService;


  formTurista:FormGroup;
  tourSelected:any;
  total:number= 0;
  reserva:any;

  private turista:any;
  private tarjeta:{};
  idTransaction:any;


  constructor(
    notifierService: NotifierService,
    private _formBuilder: FormBuilder,
    private auth:AuthService,
    private reservarService:ReservarService,
    private agencyService: AgencyService,
    private tourService:ToursService,
    private router:Router
  ) {
    this.createFormTurist();
    this.notifier = notifierService;
    this.reserva = JSON.parse(localStorage.getItem('reserva'));
    this.turista = this.auth.getDataUserSession();
    this.formTurista.get('nombre').setValue(this.turista .nombre);
    this.formTurista.get('nombre').disable();
    this.formTurista.get('email').setValue(this.turista.email);
    this.formTurista.get('email').disable();
    this.tourService.findById(this.reserva.idTour).subscribe(sucess =>{
      this.tourSelected = sucess.payload.data();
      this.total = this.reserva.cantidad * this.tourSelected.precio;

        this.agencyService.findIdTransactionById(this.tourSelected.authorId).then(res =>{
          this.idTransaction = res.transaction;
        });
    });



  }



  ngOnInit() {



  }

  createFormTurist(){
    this.formTurista = new FormGroup({
      'nombre': new FormControl('',[Validators.required]),
      'email': new FormControl('',[Validators.required, Validators.email]),
      'dni': new FormControl('',[Validators.required,Validators.minLength(8), Validators.maxLength(8)]),
      'telefono': new FormControl('',[Validators.required,Validators.minLength(9), Validators.maxLength(9)]),
      'ciudad': new FormControl(null,[Validators.required]),
      'direccion': new FormControl('',[Validators.required])
    });
  }

  onSubmit(){
    // this.submitted = true;
    // // stop here if form is invalid
    // if (this.formTurista.invalid) {
    //   this.notifier.notify('error', 'Rellene todo los campos');
    //   return;
    // }
    // this.isFormTurista = true;

    // this.turista = Object.assign({}, this.formTurista.value);
    // this.turista.pasajeros = this.cantidadPasajero;

    // this.tarjeta = Object.assign({}, this.formPago.value);

    this.reservarTours();
  }

  reservarTours(){
    var data = {
      create:  new Date(),
      fecha: this.reserva.fecha,
      numeroPersonas:this.reserva.cantidad,
      idTurista: this.turista.uid,
      turista:  Object.assign({}, this.formTurista.value),
      idTour: this.reserva.idTour,
      tour: this.tourSelected,
      monto: this.total
    }

    var mensaje = "!Felicidades se realizó su reserva de forma correcta, es momento de viajar¡";
    this.notifier.notify('success', mensaje);

    this.reservarService.reservar(data)
    .then(succes => {
      localStorage.removeItem('reserva');
      var mensaje = "!Felicidades se realizó su reserva de forma correcta, es momento de viajar¡";
      this.notifier.notify('success', mensaje);

      this.router.navigate(['turista/reservas']);
    });

  }



  buyProduct(){

    console.log("COMPRA REALIZADA");

    this.reservarTours();

    // if (this.userService._isLogged() == true){
    //   console.log("compraremos algo ");
    //   this.total = this.compra * this.product.price;
    //   console.log("lo qe vamos a gastar",this.total);
    //   this.showPayPal = true;
    // }else{
    //   let data = {
    //     _id : this.id,
    //     shop : this.compra
    //   };
    //   this.userService._saveStorageLogin(data);
    //   this.router.navigate([`/home/login`]);

    // }


  }



}
