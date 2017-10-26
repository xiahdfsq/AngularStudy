import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Product, Comment, ProductService} from "../service/product.service";
import { NgModel } from '@angular/forms';
import { WebSocketService } from '../service//web-socket.service';
import {Subscription} from "rxjs/Subscription";
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product:Product;

  comments: Comment[];
  isWatched: boolean = false;
  currentBid:number;
  subscription: Subscription;
  newRating:number = 5;
  newComment:string = "";
  isCommentHidden:boolean = true;
  //private productTitle: string;
  constructor(private routerInfo:ActivatedRoute,
  			  private productService:ProductService,
          private wsService:WebSocketService) { }
 
  ngOnInit() {
  	let productId:number = this.routerInfo.snapshot.params["productId"];
    //console.log(this.productService.findProducts(productId));
  	//this.product = this.productService.findProducts(productId);
  	this.productService.findProducts(productId).subscribe(
      product => {
        this.product = product;
        this.currentBid = product.price;
      }
    )
    //this.productTitle = this.routerInfo.snapshot.params["prodTitle"];
    this.productService.getComments(productId).subscribe(
      comments => this.comments = comments
    );
  }
  watchProduct(){
    /*if(this.subscription){
      this.subscription.unsubscribe()
      this.isWatched = false;
      this.subscription = null;
    }else{
      this.isWatched = true;
      this.subscription = this.wsService.createObservableSocket('ws://localhost:8085', this.product.id)
      .subscribe(
        products => {
          let product = products.find(p => p.productId === this.product.id);
          this.currentBid = product.bid;
        }
      )
    }  */
    this.isWatched = !this.isWatched;
    if ( this.isWatched ) {
      this.subscription = this.wsService.createObservableSocket('ws://localhost:8086', this.product.id)
        .subscribe(
          products => {
              let product = products.find( p => p.productId === this.product.id);
              this.currentBid = product.bid;
          }
        );
    } else {
        this.subscription.unsubscribe();
        this.subscription = null;
    }   
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
