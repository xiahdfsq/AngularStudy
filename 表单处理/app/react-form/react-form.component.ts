import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
@Component({
  selector: 'app-react-form',
  templateUrl: './react-form.component.html',
  styleUrls: ['./react-form.component.css']
})
export class ReactFormComponent implements OnInit {

	username:FormControl = new FormControl("aaa");
	formModel:FormGroup = new FormGroup({
		dateRange: new FormGroup({
			from: new FormControl(),
			to: new FormControl()
		}),
		emails: new FormArray([
			new FormControl("a@a.com"),
			new FormControl("djos")
		])
	});

	
  constructor() { }

  ngOnInit() {
  }
  onSubmit(){
  	console.log(this.formModel.value)
  }
  addEmail(){
  	let emails = this.formModel.get("emails") as FormArray;
  	emails.push(new FormControl());
  }
}
