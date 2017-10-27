import * as express from 'express';
import {Server} from 'ws';
const app = express();
import * as path from 'path';

app.use('/',express.static(path.join(__dirname,'..','app')))

export class Product {

	constructor(
		public id:number,
		public title:string,
		public price:number,
		public rating:number,
		public desc:string,
		public categories:Array<string>) {
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
const products: Product[] = [
  		new Product(1,"第一个商品",1.99,3.5,"这是第一个商品描述",["电子产品","手机"]),
  		new Product(2,"第二个商品",5.99,2.5,"这是第二个商品描述",["电子产品","电视机"]),
  		new Product(3,"第三个商品",3.99,4.5,"这是第三个商品描述",["衣服","裤子"]),
  		new Product(4,"第四个商品",6.99,1.5,"这是第四个商品描述",["衣服","鞋子"]),
  		new Product(5,"第五个商品",4.99,3.5,"这是第五个商品描述",["图书","小学"]),
  		new Product(6,"第六个商品",8.99,4.8,"这是第六个商品描述",["图书","大学"])
  	];
const comments: Comment[] = [
    new Comment(1,1,"2014-5-8 12:15:02","张三",3,"东西不错"),
    new Comment(2,2,"2014-5-9 12:15:02","dp",3,"圣诞节佛觉得烦"),
    new Comment(3,3,"2014-5-6 12:15:02","xiah",3,"金饭碗金佛"),
    new Comment(4,4,"2014-5-3 12:15:02","junosn",3,"vjojonvc"),
    new Comment(5,5,"2014-5-10 12:15:02","joohoo",3,"我忘记佛额外"),
];
/*app.get('/',(req,res) =>{
	res.send("hello express")
});*/
app.get('/api/products',(req,res) =>{
	let result = products;
	let params = req.query;
	if(params.title){
		result = result.filter((p) => p.title.indexOf(params.title) !== -1);
	}
    if(params.price && result.length >0){
        result = result.filter((p) => p.price <= parseInt(params.price));
    }
    if(params.category !== "-1" && result.length >0){
        result = result.filter((p) => p.categories.indexOf(params.category) !== -1);
    }
	res.json(result)
});
app.get('/api/products/:id',(req,res) =>{
	res.json(products.find((product) => product.id == req.params.id))
});
app.get('/api/products/:id/comments',(req,res) =>{
    res.json(comments.filter((comment) => comment.productId == req.params.id));
});
const server = app.listen(8000, "localhost", ()=>{
	console.log("服务器已启动，地址是：http://localhost:8000")
});

const subScription = new Map<any, number[]>();

// 在8085端口创建一个服务器，当有客户端通过ws连接这个端口时，给客户端发送消息
const wsServer = new Server({
    port: 8086
});

wsServer.on('connection', (websocket) => {
    // websocket.send('这个消息是服务器主动发送的');
    websocket.on('message', (value: any) => {

        let messageObj: any;
        messageObj = JSON.parse( value );
        let productIds = subScription.get(websocket) || [];
        subScription.set(websocket, [...productIds, messageObj.productId]);
    });
});
const currentBids = new Map<number, number>();

setInterval( () => {

    // console.log( '----->');
    products.forEach( p => {

        let currentBid = currentBids.get(p.id) || p.price;
        // 价格每次加5左右
        let newBid = currentBid + Math.random() * 5;
        // console.log("--->" + newBid);
        currentBids.set(p.id, newBid);
    });

    subScription.forEach( (productIds: number[], ws: any) => {
        if (ws.readyState === 1) {

            let newBids = productIds.map( pid => ({
                productId: pid,
                bid: currentBids.get(pid)
            }));

            ws.send(JSON.stringify(newBids));
        } else {
            subScription.delete(ws);
        }
    });

}, 6000);
setInterval(()=>{
	if(wsServer.clients){
        wsServer.clients.forEach(client =>{
            client.send("这个是定时推送")
		})
	}
},200000);