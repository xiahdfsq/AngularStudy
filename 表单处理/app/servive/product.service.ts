import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {
    private products: Product[] = [
  		new Product(1,"第一个商品",1.99,3.5,"这是第一个商品描述",["电子产品","硬件设备"]),
  		new Product(2,"第二个商品",5.99,2.5,"这是第二个商品描述",["电子产品","家电"]),
  		new Product(3,"第三个商品",3.99,4.5,"这是第三个商品描述",["生鲜产品","海鲜"]),
  		new Product(4,"第四个商品",6.99,1.5,"这是第四个商品描述",["日用品","调料"]),
  		new Product(5,"第五个商品",4.99,3.5,"这是第五个商品描述",["服装","箱包"]),
  		new Product(6,"第六个商品",8.99,4.8,"这是第六个商品描述",["娱乐","Movie"])
  	];
	private comments: Comment[] = [
		new Comment(1,1,"2014-5-8 12:15:02","张三",3,"东西不错"),
		new Comment(2,2,"2014-5-9 12:15:02","dp",3,"圣诞节佛觉得烦"),
		new Comment(3,3,"2014-5-6 12:15:02","xiah",3,"金饭碗金佛"),
		new Comment(4,4,"2014-5-3 12:15:02","junosn",3,"vjojonvc"),
		new Comment(5,5,"2014-5-10 12:15:02","joohoo",3,"我忘记佛额外"),
	]
  constructor() { }
  getProducts(): Product[] {
  	return this.products;
  }

  findProducts(id:number): Product {
  	/*console.log(id)
  	console.log(this.products.find((product) => product.id == id))*/
  	return this.products.find((product) => product.id == id)
  }
  getComments(id:number): Comment[]{
  	return this.comments.filter((comment) => comment.productId == id)
  }
}

export class Product {
	
	constructor(
		public id:number,
		public title:string,
		public price:number,
		public rating:number,
		public desc:string,
		public categories:Array<string>
	) {
		// code...
	}
}

export class Comment {
	constructor(
		public id:number,
		public productId:number,
		public timestamp:string,
		public user: string,
		public rating:number,
		public content:string
	){}
}