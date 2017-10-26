import { Component, OnInit } from '@angular/core';
import { PriceQuote } from '../price-quote/price-quote.component';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ProductService } from "../service/product.service"
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
  formModel: FormGroup;

  categories: string[];
  constructor(private productService: ProductService) { 
    let fb = new FormBuilder();
    this.formModel = fb.group({
      title: ['', Validators.minLength(3)],
      price: [null, this.positiveNumerValidator],
      category: ['-1']
    });
    /*setInterval(()=>{
      this.name = 'cindy'
    },3000)*/
  }
  ngOnInit() {
    this.categories = this.productService.getAllCategories(); 
  }
  positiveNumerValidator(control: FormControl): any{
    if(!control.value){
      return null;
    }
    let price = parseInt(control.value);
    if(price > 0){
      return null;
    }else{
      return {positiveNumber: true};
    }
  }
  onSearch(){
    if(this.formModel.valid){
      console.log(this.formModel.value)

      this.productService.searchEvent.emit(this.formModel.value)
    }
  }
}
