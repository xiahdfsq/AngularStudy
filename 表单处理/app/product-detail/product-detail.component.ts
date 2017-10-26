import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Product, Comment, ProductService} from "../servive/product.service";
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product:Product;

  comments: Comment[];

  newRating:number = 5;
  newComment:string = "";
  isCommentHidden:boolean = true;
  //private productTitle: string;
  constructor(private routerInfo:ActivatedRoute,
  			  private productService:ProductService) { }
 
  ngOnInit() {
  	let productId:number = this.routerInfo.snapshot.params["productId"];
    //console.log(this.productService.findProducts(productId));
  	this.product = this.productService.findProducts(productId);
  	//this.productTitle = this.routerInfo.snapshot.params["prodTitle"];
    this.comments = this.productService.getComments(productId);
  }
  addComment(){
    let comment = new Comment(0,this.product.id,new Date().toISOString(),"someone",this.newRating,this.newComment);
    this.comments.unshift(comment)
    let sumRating = this.comments.reduce((sum,comment) => sum + comment.rating, 0);
    this.product.rating = sumRating/this.comments.length
    this.newRating = 5;
    this.newComment = '';
    this.isCommentHidden = true;
  }
}
