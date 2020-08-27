import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3Ease from 'd3-ease';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import {DataService} from '../data.service';

@Component({
  selector: 'app-ecg',
  templateUrl: './ecg.component.html',
  styleUrls: ['./ecg.component.css']
})
export class EcgComponent implements OnInit {

  title = 'Ecg';
  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>;
  private path: any;
  private data:Array<any> = new Array(100).fill([0,0,0,0,0,0,0,0,0,0]);
  //private data:any[]=[];

  constructor(private dataService: DataService) {
    this.width = 500 - this.margin.left - this.margin.right;
    this.height = 250 - this.margin.top - this.margin.bottom;
  }

  ngOnInit() {
  this.dataService.onMessage().subscribe(
    msg => {
        // console.log(this.data);
        this.data.push(msg.ECGWaveform);
        this.updateChart();
    },
    err => console.log(err),
    () => console.log('end')
  );
}


//차트 만들기
  private createChart(){
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawLine();
}

//svg
  private initSvg() {
    this.svg = d3.select('#svg2')
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
      .attr("style","outline: thin solid black;");
  }


//x축, y축 설정
  private initAxis() {
    this.xScale = d3Scale.scaleLinear()
      .domain([0, 105])
      .range([0, this.width]);
    this.yScale = d3Scale.scaleLinear()
      .domain([5000,10000])
      .range([this.height, 0]);
  }


//x축, y축 그리기
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


//그래프 그리기
  private drawLine() {
    this.line = d3Shape.line()
      .x((d,i) => this.xScale(i))
      .y((d:any) => this.yScale(d[0]) );

    this.path=this.svg
      .append('path')
      .datum(this.data)
      .attr('class', 'line')
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", "1px")
      .attr("width",500)
      .attr('d', this.line);
  }
 

  //그래프 업데이트
  private updateChart(){
    if (!this.svg) {
        this.createChart();
        return;
    }
   
    this.path   
        .attr('d', this.line)
        .attr('transform', null)
        .transition() // Call Transition Method
        .duration(5000) // Set Duration timing (ms)
        .ease(d3.easeSin)
        //.attr("transform", "translate(" + this.xScale(+1) + ",0)")
        ;
    this.data.shift();
  }

}
