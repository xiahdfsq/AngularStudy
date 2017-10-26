import { FormControl, FormGroup} from '@angular/forms';
import { Observable} from "rxjs"

export function phoneValidator(control: FormControl): any{
	var myreg = /^(\+\d{1,4})?1[3|4|5|7|8|9]\d{9}$/;
	let valid = myreg.test(control.value);
	//console.log("验证结果"+valid)
	return valid ? null : {phone:true};
}
export function phoneAsyncValidator(control: FormControl): any{
	var myreg = /^(\+\d{1,4})?1[3|4|5|7|8|9]\d{9}$/;
	let valid = myreg.test(control.value);
	//console.log("验证结果"+valid)
	return Observable.of(valid ? null : {phone:true}).delay(5000);
}
export function equalVaildator(group: FormGroup): any {
	let password:FormControl = group.get("password") as FormControl;
	let pconfirm:FormControl = group.get("pconfirm") as FormControl;
	let valid:boolean = (password.value === pconfirm.value);
	//console.log("验证结果"+valid)
	return valid ? null : {equal:{descxxx:"密码不一致"}};
}