import { Component } from '@angular/core';
import {DataService} from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private dataService: DataService){}

  sendHistory(){
    this.dataService.sendHistory();
  }
  sendMonitor(){
    this.dataService.sendMonitor();
  }
}
