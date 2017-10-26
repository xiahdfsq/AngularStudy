import { Component, OnInit } from '@angular/core';
import { PriceQuote } from '../price-quote/price-quote.component'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  size:number = 50;
  num:number = 2;
  stock="";
  priceQuote:PriceQuote = new PriceQuote("",0);
  name:string;
  buyHandler(event: PriceQuote){
  	this.priceQuote = event;
  }
  doOnClick(event:any){
    console.log(event)
  }
  constructor() { 
    setInterval(()=>{
      this.name = 'cindy'
    },3000)
  }
  ngOnInit() {
  }

}
