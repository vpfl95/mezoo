import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  deviceNumbers: any[] = [];
  selectedDevice: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.onMessage().subscribe(
      msg => {
          this.deviceNumbers=msg;
          // console.log(this.hicardiNumber);
           console.log(msg);
      },
      err => console.log(err),
      () => console.log('end')
    );
  }

  onSelect(device: any): void{
    this.selectedDevice = device;
    this.dataService.sendDevice(this.selectedDevice);
  }
}
