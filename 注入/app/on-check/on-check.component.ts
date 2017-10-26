import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-on-check',
  templateUrl: './on-check.component.html',
  styleUrls: ['./on-check.component.css']
})
export class OnCheckComponent implements OnInit  {

  constructor() { }
  
   
  greetingFunction(msg:string){
    console.log("父组件调用子组件方法"+msg)
  }
  ngOnInit() {
  }

}
