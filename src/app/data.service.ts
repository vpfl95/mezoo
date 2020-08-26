import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _socketUrl: string;
  myWebSocket: WebSocketSubject<any> = webSocket('ws://192.168.0.97:3000/');
  testData: string;
  data: any[];

  constructor() { 
    this.myWebSocket.next({message: 'angular'});

    this.myWebSocket.subscribe(
      msg => {
        //console.log(msg);
        this.data=msg;
        //console.log(this.data);
      }, 
      err => console.log(err), 
      () => console.log('complete')
    );
  }

  getData(): Observable<any[]>{
    return of(this.data)
  }

  ngOnInit(): void {
    
  }

}
