import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Product, ProductService} from "../servive/product.service";
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product:Product;
  //private productTitle: string;
  constructor(private routerInfo:ActivatedRoute,
  			  private productService:ProductService) { }
 
  ngOnInit() {
  	let productId:number = this.routerInfo.snapshot.params["productId"];
    console.log(this.productService.findProducts(productId));
  	this.product = this.productService.findProducts(productId);
  	//this.productTitle = this.routerInfo.snapshot.params["prodTitle"];
  }

}
