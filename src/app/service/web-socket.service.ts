import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx'
@Injectable()
export class WebSocketService {

	ws:WebSocket;
    constructor() { }
    createObservableSocket(url:string, id:number): Observable<any> {
    	this.ws = new WebSocket(url);
    	return new Observable<string>(
    		observable =>{
    			this.ws.onmessage = (event) => observable.next(event.data);
    			this.ws.onerror = (event) => observable.error(event);
    			this.ws.onclose = (event) => observable.complete();
                this.ws.onopen = (event) => this.sendMessage({productId:id});
    		    return () => this.ws.close();
            }
    	).map(message => JSON.parse(message))
    }

    sendMessage(message: any){
    	this.ws.send(JSON.stringify(message));
    }
}
