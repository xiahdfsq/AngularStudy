import { Component, OnInit } from '@angular/core';
import { ProductService ,Product } from '../service/product.service';
//import { FormControl } from '@angular/forms';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private products: Observable<Product[]>;
  //private titleFilter:FormControl = new FormControl();
  private imgUrl = 'http://placehold.it/320x150';
  //private keyword:string;
  
  constructor(private productService:ProductService) {
    /*this.titleFilter.valueChanges
        .debounceTime(500)
        .subscribe(
          value =>{ this.keyword = value}
        )  
    let myHeaders:Headers = new Headers();
    myHeaders.append("Authorization","Basic 123456");
    this.products = this.http.get("/api/products").map((res) => res.json());*/
  }
  ngOnInit() {
    this.products = this.productService.getProducts();

    this.productService.searchEvent.subscribe(
      params => this.products = this.productService.search(params)
    );
  }
}