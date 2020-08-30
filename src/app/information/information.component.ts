import { Component, OnInit } from '@angular/core';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import {DataService} from '../data.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  HeartRate: any = 0;
  RespirationRate:any = 0;
  Temperature:any = 0;
  MotionStatus:any =10;
  
  private data:Array<any> = new Array;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.onMessage().subscribe(
      msg => {
          //console.log(msg);
          if(msg.HeartRate!=null){
            this.HeartRate = msg.HeartRate;
          }
          if(msg.RespirationRate!=null){
            this.RespirationRate = msg.RespirationRate;
          }
          if(msg.Temperature!=null){
            this.Temperature = msg.Temperature;
          }
          this.MotionStatus = msg.MotionStatus;
        //  this.data.push(msg);
        //  console.log(this.data);
      },
      err => console.log(err),
      () => console.log('end')
    );
  }

}
