import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

import { RegisterDetailService } from './register-detail.service';
import { Viajero,Representante, Empresa } from '../user';

function passwordMatchValidator(password: string): ValidatorFn {
  return (control: FormControl) => {
    console.log(control)
    if (!control || !control.parent) {
      return null;
    }
    return control.parent.get(password).value === control.value ? null : { mismatch: true };
  };
}


@Component({
  selector: 'app-register-detail',
  templateUrl: './register-detail.component.html',
  styleUrls: ['./register-detail.component.css']
})
export class RegisterDetailComponent implements OnInit {
  option:string;
  message: string;
  notifier: NotifierService;
  registerForm: FormGroup;
  viajeroForm:FormGroup;
  representanteForm:FormGroup;
  empresaForm:FormGroup;
  viajero: Viajero;
  representante:Representante;
  empresa:Empresa;

  passConfirm:boolean=false;
  submitted:boolean = false;

  constructor(
    notifierService: NotifierService,
    private route: ActivatedRoute,
    private registerService: RegisterDetailService
  ) {this.notifier = notifierService; }

  ngOnInit() {
    this.option = this.route.snapshot.paramMap.get('option');

    this.createForm();
  }

  createForm(){
    this.viajeroForm = new FormGroup({
      'nombre': new FormControl('',[Validators.required]),
      'apellidos': new FormControl('',[Validators.required]),
      'pais': new FormControl('',[Validators.required]),
      'email': new FormControl('',[Validators.required,Validators.email]),
      'password': new FormControl('',[Validators.required]),
      'confirmPassword': new FormControl('',[Validators.required, passwordMatchValidator('password')]),
      'accept': new FormControl('',[Validators.requiredTrue]),
    });

    this.representanteForm = new FormGroup({
      'dni': new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]),
      'nombre': new FormControl('',[Validators.required]),
      'apellidos': new FormControl('',[Validators.required]),
      'email': new FormControl('',[Validators.required,Validators.email]),
      'password': new FormControl('',[Validators.required])
    });

    this.empresaForm = new FormGroup({
      'nombre': new FormControl('',[Validators.required]),
      'razonSocial': new FormControl('',[Validators.required]),
      'ruc': new FormControl('',[Validators.required]),
      'email': new FormControl('',[Validators.required,Validators.email]),
      'telefono': new FormControl('',[Validators.required]),
      'web': new FormControl('',[]),
      'direccion': new FormControl('',[Validators.required]),
      'region': new FormControl('',[Validators.required]),
      'logo': new FormControl('',[Validators.required]),
      'accept': new FormControl('',[Validators.requiredTrue]),
    });


  }

  // convenience getter for easy access to form fields
  get f() { return this.viajeroForm.controls }
  get group2() { return this.representanteForm.controls }
  get group3() { return this.empresaForm.controls }

  registerViajero(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.viajeroForm.invalid) {
      return;
    }

    var aux = Object.assign({}, this.viajeroForm.value);
    delete aux.confirmPassword;
    this.viajero = aux;

    this.registerService.registerViajero(this.viajero)
      .then(succes => {
        this.notificar('success', succes.message)
        this.viajeroForm.reset();
        this.submitted = false;
      })
      .catch(error=>{
        this.notificar('error', error.error)
        this.resetForm1();
      });


  }

  registerAgencia(){
    this.submitted = true;
    console.log('cambiamos variable', this.submitted);
    // stop here if form is invalid
    if (this.representanteForm.invalid || this.empresaForm.invalid) {
      return;
    }
    this.representante = Object.assign({}, this.representanteForm.value);
    this.empresa = Object.assign({}, this.empresaForm.value);

    this.registerService.registerAgencia(this.representante, this.empresa)
      .then(succes => {
        this.notificar('success', succes.message)
        this.representanteForm.reset();
        this.empresaForm.reset();
        this.submitted = false;
      })
      .catch(error=>{
        this.notificar('error', error.error)
        this.resetForm2();
      })

  }

  resetForm1() {

    setTimeout(() => {
      this.viajeroForm.get('email').setValue('');
      this.viajeroForm.get('password').setValue('');
    }, 500);

  }

  resetForm2() {

    setTimeout(() => {
      this.representanteForm.get('email').setValue('');
      this.representanteForm.get('password').setValue('');
    }, 500);

  }
  private notificar(status, message){
    this.notifier.notify( status,message);
  }


}


export class PasswordValidator {
  // Inspired on: http://plnkr.co/edit/Zcbg2T3tOxYmhxs7vaAm?p=preview
  static areEqual(formGroup: FormGroup) {
    let value;
    let valid = true;
    for (let key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        let control: FormControl = <FormControl>formGroup.controls[key];

        if (value === undefined) {
          value = control.value
        } else {
          if (value !== control.value) {
            valid = false;
            break;
          }
        }
      }
    }

    if (valid) {
      return null;
    }

    return {
      areEqual: true
    };
  }
}
