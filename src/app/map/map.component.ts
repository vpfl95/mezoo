import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  lat: any;
  lng: any;
  zoom: number = 15;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.onMessage().subscribe(
      msg => {
        //console.log(msg);
          this.lat=msg.position.latitude;
          this.lng=msg.position.longitude;
          // console.log(this.lat);
          // console.log(this.lng);
        
      },
      err => console.log(err),
      () => console.log('end')
    );
  }

}
