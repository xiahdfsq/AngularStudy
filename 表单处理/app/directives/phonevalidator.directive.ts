import { Directive } from '@angular/core';
import { NG_VALIDATORS } from "@angular/forms";
import { phoneValidator } from "../validtors/validtorForms";
@Directive({
  selector: '[phone]',
  providers: [{provider: NG_VALIDATORS, userValue:phoneValidator, multi:true}]
})
export class PhonevalidatorDirective {

  constructor() { }

}
