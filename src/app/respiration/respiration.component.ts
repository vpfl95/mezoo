import { Component, OnInit, OnChanges } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3Ease from 'd3-ease';
import {DataService} from '../data.service';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";

@Component({
  selector: 'app-respiration',
  templateUrl: './respiration.component.html',
  styleUrls: ['./respiration.component.css']
})
export class RespirationComponent implements OnInit {

  title = 'RespirationSignal';
  private margin = {top: 20, right: 20, bottom: 30, left: 50};
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>;
  private path: any;

  myWebSocket: WebSocketSubject<any> = webSocket('ws://192.168.0.97:3000/');
  private data: Array<any> = new Array(100).fill(0);  

  
  constructor(private dataService: DataService) {
      this.width = 500 - this.margin.left - this.margin.right;
      this.height = 250 - this.margin.top - this.margin.bottom;

  }

 ngOnInit() {
    //this.myWebSocket.next({message: 'angular'});

    this.myWebSocket.subscribe(
        msg => {
        //console.log(msg); 
        this.data.push(msg);
       // console.log(msg); 
        this.updateChart();
        }, 
        err => console.log(err), 
        () => console.log('complete')
        
    );
   
  
}
    
    // getData(): void{
    //     console.log(this.datas);
    //     this.dataService.getData()
    //         .subscribe(data => this.datas = data);
    // }
    private createChart(){
        this.initSvg();
        this.initAxis();
        this.drawAxis();
        this.drawLine();
    }

    private initSvg() {
        this.svg = d3.select('svg')
            .append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
            .attr("style","outline: thin solid black;")
            ;

    }

    private initAxis() {
        this.xScale = d3Scale.scaleLinear()
            .domain([0,100])
            .range([0, this.width]);
        this.yScale = d3Scale.scaleLinear()
            .domain([-5000,20000])
            .range([this.height, 0]);
    }

    private drawAxis() {

        this.svg.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3Axis.axisBottom(this.xScale));

        this.svg.append('g')
            .attr('class', 'axis axis--y')
            .call(d3Axis.axisLeft(this.yScale))
            .append('text')
            .attr('class', 'axis-title')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end');
    }

    private drawLine() {
       
        this.line = d3Shape.line()
            .x( (d,i) => this.xScale(i))
            .y( (d: any) => this.yScale(d.RespirationSignal));

        this.path=this.svg
            .append('path')
            .datum(this.data)
            .attr('class', 'line')
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", "1px")
            .attr("width",500)
            .attr('d', this.line);
             
    }

    private updateChart(){
        if (!this.svg) {
            this.createChart();
            return;
        }
        //console.log(this.data);
        this.path   
            .attr('d', this.line)
            .attr('transform', null)
            .transition() // Call Transition Method
            .duration(10000) // Set Duration timing (ms)
            .ease(d3.easeLinear)
           // .attr("transform", "translate(" + this.xScale(-1) + ",0)")
            ;
  
        this.data.shift();
    }
 
}
