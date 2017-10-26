import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../service//web-socket.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    constructor(private wsService:WebSocketService) { }

	ngOnInit() {
	  	this.wsService.createObservableSocket('ws://localhost:8085')
	  	.subscribe(
	  		data => console.log(data),
	  		err => console.log(err),
	  		() => console.log('流已经结束'),
	  	)
	}
	sendMessageToServer(){
		this.wsService.sendMessage("hello from client");
	}
}
