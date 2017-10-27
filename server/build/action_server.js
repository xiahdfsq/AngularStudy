"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var ws_1 = require("ws");
var app = express();
var path = require("path");
app.use('/', express.static(path.join(__dirname, '..', 'app')));
var Product = (function () {
    function Product(id, title, price, rating, desc, categories) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
    }
    return Product;
}());
exports.Product = Product;
var Comment = (function () {
    function Comment(id, productId, timestamp, user, rating, content) {
        this.id = id;
        this.productId = productId;
        this.timestamp = timestamp;
        this.user = user;
        this.rating = rating;
        this.content = content;
    }
    return Comment;
}());
exports.Comment = Comment;
var products = [
    new Product(1, "第一个商品", 1.99, 3.5, "这是第一个商品描述", ["电子产品", "手机"]),
    new Product(2, "第二个商品", 5.99, 2.5, "这是第二个商品描述", ["电子产品", "电视机"]),
    new Product(3, "第三个商品", 3.99, 4.5, "这是第三个商品描述", ["衣服", "裤子"]),
    new Product(4, "第四个商品", 6.99, 1.5, "这是第四个商品描述", ["衣服", "鞋子"]),
    new Product(5, "第五个商品", 4.99, 3.5, "这是第五个商品描述", ["图书", "小学"]),
    new Product(6, "第六个商品", 8.99, 4.8, "这是第六个商品描述", ["图书", "大学"])
];
var comments = [
    new Comment(1, 1, "2014-5-8 12:15:02", "张三", 3, "东西不错"),
    new Comment(2, 2, "2014-5-9 12:15:02", "dp", 3, "圣诞节佛觉得烦"),
    new Comment(3, 3, "2014-5-6 12:15:02", "xiah", 3, "金饭碗金佛"),
    new Comment(4, 4, "2014-5-3 12:15:02", "junosn", 3, "vjojonvc"),
    new Comment(5, 5, "2014-5-10 12:15:02", "joohoo", 3, "我忘记佛额外"),
];
/*app.get('/',(req,res) =>{
    res.send("hello express")
});*/
app.get('/api/products', function (req, res) {
    var result = products;
    var params = req.query;
    if(params.category){
        if (params.title) {
            result = result.filter(function (p) { return p.title.indexOf(params.title) !== -1; });
        }
        if (params.price && result.length > 0) {
            result = result.filter(function (p) { return p.price <= parseInt(params.price); });
        }
        if (params.category !== "-1" && result.length > 0) {
            result = result.filter(function (p) { return p.categories.indexOf(params.category) !== -1; });
        }
    }
    res.json(result);
});
app.get('/api/products/:id', function (req, res) {
    res.json(products.find(function (product) { return product.id == req.params.id; }));
});
app.get('/api/products/:id/comments', function (req, res) {
    res.json(comments.filter(function (comment) { return comment.productId == req.params.id; }));
});
var server = app.listen(8000, "localhost", function () {
    console.log("服务器已启动，地址是：http://localhost:8000");
});
var subScription = new Map();
// 在8085端口创建一个服务器，当有客户端通过ws连接这个端口时，给客户端发送消息
var wsServer = new ws_1.Server({
    port: 8086
});
wsServer.on('connection', function (websocket) {
    // websocket.send('这个消息是服务器主动发送的');
    websocket.on('message', function (value) {
        var messageObj;
        messageObj = JSON.parse(value);
        var productIds = subScription.get(websocket) || [];
        subScription.set(websocket, productIds.concat([messageObj.productId]));
    });
});
var currentBids = new Map();
setInterval(function () {
    // console.log( '----->');
    products.forEach(function (p) {
        var currentBid = currentBids.get(p.id) || p.price;
        // 价格每次加5左右
        var newBid = currentBid + Math.random() * 5;
        // console.log("--->" + newBid);
        currentBids.set(p.id, newBid);
    });
    subScription.forEach(function (productIds, ws) {
        if (ws.readyState === 1) {
            var newBids = productIds.map(function (pid) { return ({
                productId: pid,
                bid: currentBids.get(pid)
            }); });
            ws.send(JSON.stringify(newBids));
        }
        else {
            subScription.delete(ws);
        }
    });
}, 6000);
setInterval(function () {
    if (wsServer.clients) {
        wsServer.clients.forEach(function (client) {
            client.send("这个是定时推送");
        });
    }
}, 200000);
