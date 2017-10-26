import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms"
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onSubmit(value:any, valid:boolean){
  	console.log(valid);
  	console.log(value);
  }
  mobileValid:boolean = true;
  mobileUntouched:boolean = true;
  inputHaddle(form:NgForm){
    if(form){
      this.mobileValid = form.form.get("phone").valid;
      this.mobileUntouched = form.form.get("phone").untouched;
    }
  }
}
