import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messages = new Subject<any>();

  myWebSocket: WebSocketSubject<any> = webSocket('ws://192.168.0.97:3000/');

  constructor(){
    this.myWebSocket.next({message: 'service connected'});
    
    this.myWebSocket.subscribe(
      msg => {this.messages.next(msg);},
      err => {console.log(err);},
      () => console.log('complete')
    );
  }

  onMessage(): Observable<any> {
    return this.messages.asObservable();
  }

  subscribe(){
    //this.myWebSocket.next({message: 'testststes'});
    this.myWebSocket.subscribe(
      msg => {console.log(msg); this.messages.next(msg);},
      err => {console.log(err);},
      () => console.log('complete')
    );
  }


}
