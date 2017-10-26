//import { Component, OnInit, Input, OnChanges,SimpleChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { Component, OnInit, Input, OnChanges,SimpleChanges, ViewChild} from '@angular/core';
import { OnCheckComponent } from '../on-check/on-check.component';
let logIndex:number = 1;
@Component({
  selector: 'app-life',
  templateUrl: './life.component.html',
  styleUrls: ['./life.component.css']
})
//export class LifeComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
export class LifeComponent implements OnInit, OnChanges{
  @Input() greeting:string;
  @Input() user:{name:string};
  message:string = "初始化消息";
  oldUsername:string;
  changeDetected:boolean = false;
  noChangeCount:number = 1;
  @ViewChild("child1") child1: OnCheckComponent;
  constructor() {
  	
  }

  ngOnInit():void{
    setInterval(() =>{
      this.child1.greetingFunction("Tom");
    },5000)
  }
  ngOnChanges(changes: SimpleChanges): void{
  	console.log(JSON.stringify(changes,null,2))
  }
  /*ngDoCheck(): void{
  	if(this.user.name !== this.oldUsername){
      this.changeDetected = true;
      console.log("Docheck:user.name从"+this.oldUsername+"变为"+this.user.name)
      this.oldUsername = this.user.name
    }
    if(this.changeDetected){
      this.noChangeCount =0;
    }else{
      this.noChangeCount ++;
      console.log("数据没有发生变化"+this.noChangeCount)
    }
    this.changeDetected =false;
  }  
  ngAfterViewInit(): void{
    console.log("父组件的视图初始化完毕")
  } 
  ngAfterViewChecked(): void{
    console.log("父组件的视图变更检测完毕")
  } 
  ngAfterContentInit(): void{
  	this.logIt("ngAfterContentInit")
  }
  ngAfterContentChecked(): void{
  	this.logIt("ngAfterContentChecked")
  }
  ngOnDestroy(): void{
  	this.logIt("OnDestroy")
  }*/
}
