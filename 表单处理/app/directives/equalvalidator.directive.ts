import { Directive } from '@angular/core';
import { NG_VALIDATORS } from "@angular/forms";
import { equalVaildator } from "../validtors/validtorForms";

@Directive({
  selector: '[equal]',
  providers: [{provider: NG_VALIDATORS, userValue:equalVaildator, multi:true}]
})
export class EqualvalidatorDirective {

  constructor() { }

}
