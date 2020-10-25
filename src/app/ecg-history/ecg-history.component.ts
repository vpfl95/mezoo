import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import {DataService} from '../data.service';

@Component({
  selector: 'app-ecg-history',
  templateUrl: './ecg-history.component.html',
  styleUrls: ['./ecg-history.component.css']
})
export class EcgHistoryComponent implements OnInit {
  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>;
  private path:any;
  private pathlength: any;
  private a: any[] = [];
  private data: any[] = [];

  constructor(private dataService: DataService) {
    this.width = 500 - this.margin.left - this.margin.right;
    this.height = 125 - this.margin.top - this.margin.bottom;
   }

  ngOnInit(): void {
    this.dataService.onMessage().subscribe(
      msg => {
          this.data=msg;
          console.log(this.data);
          
          this.data.forEach((d, i) => {
            for (let j = 0; j < 10; j++) {
              this.a.push({
                ecg_x: i * 10 + j,
                ecg_y: d.ECGWaveform[j]
              })
            }
          })
          console.log(this.a);
          this.initSvg();
          this.initAxis();
          this.drawAxis();
          this.drawLine();
      },
      err => console.log(err),
      () => console.log('end')
    );
  }
  private initSvg() {
    this.svg = d3.select('.ecg-history')
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
     ;
  }

  private initAxis() {
    this.xScale = d3Scale.scaleLinear()
      .domain([0, 2000])
      .range([0, this.width]);
    this.yScale = d3Scale.scaleLinear()
      .domain([5000, 10000])
      .range([this.height, 0]);

  }

  private drawAxis() {

    // this.svg.append('g')
    //   .attr('class', 'axis axis--x')
    //   .attr('transform', 'translate(0,' + this.height + ')')
    //   .call(d3Axis.axisBottom(this.xScale));

    // this.svg.append('g')
    //   .attr('class', 'axis axis--y')
    //   .call(d3Axis.axisLeft(this.yScale))
    //   .append('text')
    //   .attr('class', 'axis-title')
    //   .attr('transform', 'rotate(-90)')
    //   .attr('y', 6)
    //   .attr('dy', '.71em')
    //   .style('text-anchor', 'end')
    //   .text('Price ($)');
  }

  private drawLine() {
    
    this.line = d3Shape.line()
      .x((d: any,i) => this.xScale(d.ecg_x))
      .y((d: any,i) => this.yScale(d.ecg_y));
    
    this.path=this.svg.append('path')
      .datum(this.a)
      .attr('class', 'line')
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", "2px")
      .attr('d', this.line)
      .attr("transform", "translate(" + this.xScale(-100) + ",0)");

      // this.pathlength = this.path.node().getTotalLength();
            
      // this.path
      //     .attr("stroke-dashoffset", this.pathlength)
      //     .attr("stroke-dasharray", this.pathlength)
      //     .transition()
      //     .ease(d3.easeSin)
      //     .duration(10000)
      //     .attr("stroke-dashoffset", 0); 
  }
}
