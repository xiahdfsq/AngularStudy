import { Component, OnInit } from '@angular/core';
import { ProductService ,Product } from '../servive/product.service';
import { FormControl } from '@angular/forms';
import 'rxjs/Rx'
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
	dataSource:Observable<any>;
  products:Array<any> = [];
  constructor(private http:Http){
    this.dataSource = this.http.get('/products').map((res)=> res.json());
  }
  ngOnInit() {
    this.dataSource.subscribe(
      (data) => this.products = data
    )
  }
	//private products: Array<Product>;
	private keyword:string;
	private products: Product[];
  private titleFilter:FormControl = new FormControl();
	private imgUrl = 'http://placehold.it/320x150';
  	constructor(private productService:ProductService) {
  		this.titleFilter.valueChanges
  			.debounceTime(500)
  			.subscribe(
          value =>{ this.keyword = value}
        )
  	}

  	ngOnInit() {
	  	this.products = this.productService.getProducts();
	}
}
