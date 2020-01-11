import { Directive,Input, OnChanges, SimpleChanges } from '@angular/core';
import {Validator,AbstractControl, ValidatorFn,NG_VALIDATORS} from '@angular/forms';

export function phoneValidator(phoneExp: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const phone = phoneExp.test(control.value);
    return !phone ? {'phoneNumber': {value: control.value}} : null;
  };
}

@Directive({
  selector: '[appPhone]',
  providers: [{provide: NG_VALIDATORS, useExisting: PhoneDirective, multi: true}]
})
export class PhoneDirective implements Validator{

  @Input('appPhone') phone: string;

  validate(control: AbstractControl): {[key: string]: any} | null {
    
    return this.phone ? phoneValidator(new RegExp(this.phone, 'i'))(control): null;

  }

}
