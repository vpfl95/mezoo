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
  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>;
  private path: any;
  private xAxis: any;
  private yAxis: any;
  private xAxisGroup: any;
  private yAxisGroup: any;
  private data:Array<any> = new Array(100).fill([8300,8300,8300,8300,8300,8300,8300,8300,8300,8300]);
  ArrhythmiaAnnotation: any=0;

  constructor(private dataService: DataService) {
    this.width = 500 - this.margin.left - this.margin.right;
    this.height = 130 - this.margin.top - this.margin.bottom;
  }

  ngOnInit() {
   
  this.dataService.onMessage().subscribe(
    msg => {
        //console.log(msg);
        //console.log(msg.ECGWaveform);
        this.data.push(msg.ECGWaveform);
        if(msg.ArrhythmiaAnnotation>0){
          this.ArrhythmiaAnnotation=msg.ArrhythmiaAnnotation;
        }
        else{
          this.ArrhythmiaAnnotation=0;
        }
        // console.log(this.ArrhythmiaAnnotation);
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
    this.svg = d3.select('.ecg')
      .append('g').attr("class","grid") 
      .attr('transform', 'translate(' + -1+ ',' + this.margin.top + ')');
  }


//x축, y축 설정
  private initAxis() {
    this.xScale = d3Scale.scaleLinear()
      .domain([0, 130])
      .range([0, this.width]);
    this.yScale = d3Scale.scaleLinear()
      .domain(d3.extent(this.data,(d)=>d[1]))
      .range([this.height, 0]);
  }


//x축, y축 그리기
  private drawAxis() {
    // this.xAxis=d3Axis.axisBottom(this.xScale)
    // this.xAxisGroup=this.svg.append('g')
    //   .attr('class', 'axis axis--x')
    //   .attr('transform', 'translate(0,' + this.height + ')')
    //   .call(this.xAxis)

    this.yAxis=d3Axis.axisLeft(this.yScale);
    this.yAxisGroup=this.svg.append('g')
      .attr('class', 'axisy')
      .call(this.yAxis)
      //.append('text')
      .attr('class', 'axis-title')
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
      .attr("stroke", "rgb(81, 255, 0)")
      .attr("stroke-width", "2px")
      .attr("width",500)
      .attr("height",10)
      .attr('d', this.line)
      ;

 
  }
 

  //그래프 업데이트
  private updateChart(){
    if (!this.svg) {
        this.createChart();
        return;
    }
  
    this.yScale 
        .domain(d3.extent(this.data,(d)=>d[1]))
        .range([this.height, 0]);
    this.yAxis=d3Axis.axisLeft(this.yScale);
    this.yAxisGroup.transition().call(this.yAxis);
     
    this.path   
        .attr('d', this.line)
        .attr('transform', null)
        .transition() // Call Transition Method
        .duration(5000) // Set Duration timing (ms)
        .ease(d3.easeSin)
        ;

    this.data.shift();

    
  }

}
