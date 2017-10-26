import { Component, OnInit } from '@angular/core';
import { ProductService ,Product } from '../service/product.service';
import { FormControl } from '@angular/forms';

import {Observable} from "rxjs/Observable";
import {Http, Headers} from "@angular/http";
import "rxjs/Rx";
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private titleFilter:FormControl = new FormControl();
  private imgUrl = 'http://placehold.it/320x150';
  private keyword:string;
  // private products: Product[];

    
  //dataSource: Observable<any>;
  //products: Array<any> = [];
  products: Observable<any>
  constructor(private http: Http,
              private productService:ProductService) {
    this.titleFilter.valueChanges
        .debounceTime(500)
        .subscribe(
          value =>{ this.keyword = value}
        )      
    //this.dataSource = this.http.get("/api/products").map((res) => res.json());
    let myHeaders:Headers = new Headers();
    myHeaders.append("Authorization","Basic 123456");
    this.products = this.http.get("/api/products").map((res) => res.json());
  }
  ngOnInit() {
    /*this.dataSource.subscribe(
      (data) => this.products = data
    )*/
  }
  
    /*ngOnInit() {
      this.products = this.productService.getProducts();
    }*/
}