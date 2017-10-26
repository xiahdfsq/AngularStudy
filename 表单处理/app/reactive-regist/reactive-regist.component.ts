import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators} from '@angular/forms';
import { phoneValidator, equalVaildator} from '../validtors/validtorForms';

@Component({
  selector: 'app-reactive-regist',
  templateUrl: './reactive-regist.component.html',
  styleUrls: ['./reactive-regist.component.css']
})
export class ReactiveRegistComponent implements OnInit {
	/*xx(control:AbstractControl): {[key:string]: any}{
		return null
	}*/
	formModel: FormGroup;
	/*constructor() { 
	  	this.formModel = new FormGroup({
	  		username : new FormControl(),
	  		phone : new FormControl(),
	  		passwordGroup: new FormGroup({
	  			password : new FormControl(),	
	  			pconfirm : new FormControl()
	  		})
	  		
	  	})
  	}*/
  	constructor(fb: FormBuilder) { 
	  	this.formModel = fb.group({
	  		username : ['',[Validators.required,Validators.minLength(6)]],
	  		phone : ['', phoneValidator],
	  		passwordGroup: fb.group({
	  			password : ['',Validators.minLength(6)],	
	  			pconfirm : ['']
	  		},{validator: equalVaildator})
	  		
	  	})
  	}

	ngOnInit() {
	}
	onSubmit(){
		/*let isVaild:boolean = this.formModel.get("username").valid;
		let errors:any = this.formModel.get("username").errors;
		console.log("username的校验结果"+isVaild);
		console.log("username的错误信息"+errors);*/
		if(this.formModel.valid){
			console.log(this.formModel.value);
		}
	}
}
