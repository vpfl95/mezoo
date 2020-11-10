import { Component, OnInit } from '@angular/core';
import {HostListener} from '@angular/core';
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
  private data: any[] = [];      //db에서 전체 데이터
  private ecgData: any[] = [];    //history에 나타낼 데이터
  private ecgData1: any;          //ecgData 분할1
  private ecgData2: any;          //분할2
  private ecgData3: any;          //분할3
  private ecgData4: any;          //분할4
  private ecgData5: any;          //분할5 
  datas:any;                      //마우스무브 데이터
  private svg1: any;
  private svg2: any;
  private svg3:any;
  private svg4: any;
  private svg5: any;
  private focus1: any
  private focus2: any
  private focus3: any
  private focus4: any
  private focus5: any
  index: number;
  private x: any;
  private xScaleValue: any;
  private yScaleValue: any;

  constructor(private dataService: DataService) {
    this.width = 2000 - this.margin.left - this.margin.right;
    this.height = 125 - this.margin.top - this.margin.bottom;
    this.index=0;
   }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event) {
     // this.xPos=event.clientX;
     // this.yPos=event.clientY;
     this. x = event.offsetX-this.margin.left;
    //  this.scalePointPosition(event,this.focus1);
    //  this.scalePointPosition(event,this.focus2);
    //  this.scalePointPosition(event,this.focus3);
    //  this.scalePointPosition(event,this.focus4);
    //  this.scalePointPosition(event,this.focus5);
  }

  ngOnInit(): void {
    this.dataService.onMessage().subscribe(
      msg => {
          this.data=msg;
          console.log(this.data);
          
          this.data.forEach((d, i) => {
            for (let j = 0; j < 10; j++) {
              this.ecgData.push({
                ecg_x: i * 10 + j,
                ecg_y: d.ECGWaveform[j],
                Time: d.Time,
                ArrhythmiaAnnotation: d.ArrhythmiaAnnotation
              })
            }
            this.ecgData1 = this.ecgData.slice(0,2000);
            this.ecgData2 = this.ecgData.slice(2000,4000);
            this.ecgData3 = this.ecgData.slice(4000,6000);
            this.ecgData4 = this.ecgData.slice(6000,8000);
            this.ecgData5 = this.ecgData.slice(8000,10000);
          })
         
          this.initSvg();
          this.initAxis();
          this.drawAxis();
          if(this.ecgData.length>0)this.drawLine(this.svg1,this.ecgData1,this.focus1);
          if(this.ecgData.length>2000) this.drawLine(this.svg2,this.ecgData2,this.focus2);
          if(this.ecgData.length>4000) this.drawLine(this.svg3,this.ecgData3,this.focus3);
          if(this.ecgData.length>6000) this.drawLine(this.svg4,this.ecgData4,this.focus4);
          if(this.ecgData.length>8000) this.drawLine(this.svg5,this.ecgData5,this.focus5);
      },
      err => console.log(err),
      () => console.log('end')
    );
  }

  private initSvg() {
    if(this.ecgData.length>0) this.svg1 = d3.select(".ecg-history1").append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    if(this.ecgData.length>2000) this.svg2 = d3.select(".ecg-history2").append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    if(this.ecgData.length>4000) this.svg3 = d3.select(".ecg-history3").append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');  
    if(this.ecgData.length>6000) this.svg4 = d3.select(".ecg-history4").append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')'); 
    if(this.ecgData.length>8000) this.svg5 = d3.select(".ecg-history5").append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private initAxis() {
    this.xScale = d3Scale.scaleLinear()
      .domain([0, 10000])
      .range([0, this.width]);
    this.yScale = d3Scale.scaleLinear()
      .domain([5000, 15000])
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

  private drawLine(svg:any, data:any, focus:any) {
    this.line = d3Shape.line()
      .x((d: any,i) => this.xScale(i))
      .y((d: any,i) => this.yScale(d.ecg_y));
    //패스(그래프) 설정
    this.path=svg.append('path')
                .datum(data)
                .attr('class', 'line')
                .attr("fill", "none")
                .attr("stroke", "black")
                .attr("stroke-width", "1.2px")
                .attr("width",500)
                .attr('d', this.line); 
    //Arrhythmia>0 이면 빨간점표시
    svg.selectAll("dot")
      .data(data)
      .enter().append("circle")
      .attr("r", 1)
      .attr("cx", (d:any,i) => {return this.xScale(i);})
      .attr("cy", (d:any,i) => {
        if(d.ArrhythmiaAnnotation>0){
          return this.yScale(d.ecg_y);
      } else return this.yScale(0);
      }).style("fill",'red');
    //포커스(circle) 설정
    focus = svg.append('g')
                    .attr('class', 'focus')
                    .style('display', 'none');
    this.renderPoint(focus,svg);
      // if(this.ecgData.length>0){
      //   this.path=this.svg1.append('path')
      //                     .datum(this.ecgData1)
      //                     .attr('class', 'line')
      //                     .attr("fill", "none")
      //                     .attr("stroke", "black")
      //                     .attr("stroke-width", "2px")
      //                     .attr("width",500)
      //                     .attr('d', this.line);          
      // this.focus1 = this.svg1
      //                   .append('g')
      //                   .attr('class', 'focus')
      //                   .style('display', 'none');
      // this.renderPoint(this.focus1,this.svg1);
      // }
      // if(this.ecgData.length>2000){
      //   this.path=this.svg2.append('path')
      //                     .datum(this.ecgData2)
      //                     .attr('class', 'line')
      //                     .attr("fill", "none")
      //                     .attr("stroke", "black")
      //                     .attr("stroke-width", "2px")
      //                     .attr("width",500)
      //                     .attr('d', this.line);
      //   this.focus2 = this.svg2
      //                     .append('g')
      //                     .attr('class', 'focus')
      //                     .style('display', 'none');
      //   this.renderPoint(this.focus2,this.svg2);
      // }
      // if(this.ecgData.length>4000){
      //   this.path=this.svg3.append('path')
      //                     .datum(this.ecgData3)
      //                     .attr('class', 'line')
      //                     .attr("fill", "none")
      //                     .attr("stroke", "black")
      //                     .attr("stroke-width", "2px")
      //                     .attr("width",500)
      //                     .attr('d', this.line);   
      //   this.focus3 = this.svg3
      //                     .append('g')
      //                     .attr('class', 'focus')
      //                     .style('display', 'none');
      //   this.renderPoint(this.focus3,this.svg3);
      // }
      // if(this.ecgData.length>6000){
      //   this.path=this.svg4.append('path')
      //                     .datum(this.ecgData4)
      //                     .attr('class', 'line')
      //                     .attr("fill", "none")
      //                     .attr("stroke", "black")
      //                     .attr("stroke-width", "2px")
      //                     .attr("width",500)
      //                     .attr('d', this.line);
      //   this.focus4 = this.svg4
      //                     .append('g')
      //                     .attr('class', 'focus')
      //                     .style('display', 'none');
      //   this.renderPoint(this.focus4,this.svg4);   
      // }
      // if(this.ecgData.length>8000){
      //   this.path=this.svg5.append('path')
      //                     .datum(this.ecgData5)
      //                     .attr('class', 'line')
      //                     .attr("fill", "none")
      //                     .attr("stroke", "black")
      //                     .attr("stroke-width", "2px")
      //                     .attr("width",500)
      //                     .attr('d', this.line);  
      //   this.focus5 = this.svg5
      //                     .append('g')
      //                     .attr('class', 'focus')
      //                     .style('display', 'none');
      //   this.renderPoint(this.focus5,this.svg5);
      // }
  }

  private renderPoint(focus: any, svg: any){
    // renders x and y crosshair
    focus.append('circle').attr('r', 2.5).attr('fill','blue');
    focus.append('text').attr("x", 9);
    focus.append('line').classed('x', true);
    focus.append('line').classed('y', true);

    svg.append('rect')
        .attr('class', 'overlay')
        .attr('width', this.width)
        .attr('height', this.height)
        .attr('opacity',0)
        .on('mouseover', () => {
          focus.style('display', null);
          focus.append("text")
            .attr("x", 10)
            .attr("y", 10)
            .attr("opacity", 1);
            })
        .on('mouseout', () => {
          focus.style('display', 'none');
          focus.selectAll("text").remove();
        })
        .on('mousemove',(d: any) =>{
          this.xScaleValue= this.xScale.invert(this.x);
          const i = Math.round(this.xScaleValue);
          this.yScaleValue=this.datas[i];
          //포커스(circle)위치 이동
          focus.attr('transform', 'translate(' + this.x + ',' + this.yScale(this.yScaleValue.ecg_y) + ')');
          //크로스헤어 표시
          focus.select('line.x')
                .attr('x1', 0)
                .attr('x2', this.xScale(this.xScaleValue)- this.width)
                .attr('y1', 0)
                .attr('y2', 0);
          focus.select('line.y')
                .attr('x1', 0)
                .attr('x2', 0)
                .attr('y1', 0)
                .attr('y2', this.height - this.yScale(this.yScaleValue.ecg_y));
          //정보 텍스트 표시
          focus.select("text")
              .datum(this.yScaleValue)
              .attr("x", 10)
              .attr("y", 10)
              .attr("opacity", 1)
              .html((d:any) => {
                  if(d.ArrhythmiaAnnotation!=null && d.ArrhythmiaAnnotation>0 )
                  return "<tspan  x='0' dy='1.2em' >" + 'Time: ' + d.Time + "</tspan>" 
                  + "<tspan x='0' dy='1.2em'>" + 'Signal: ' + d.ecg_y + "</tspan>"
                  + "<tspan x='0' dy='1.2em'>" + 'Arrhythmia: ' + d.ArrhythmiaAnnotation + "</tspan>";
                  else
                  return "<tspan  x='0' dy='1.2em' >" + 'Time: ' + d.Time + "</tspan>" 
                  + "<tspan x='0' dy='1.2em'>" + 'Signal: ' + d.ecg_y + "</tspan>";
              });
        });
     d3.select('.overlay').style('fill', 'none');
     d3.select('.overlay').style('pointer-events', 'all');
     d3.selectAll('.focus line').style('fill', 'none');
     d3.selectAll('.focus line').style('stroke', '#67809f');
     d3.selectAll('.focus line').style('stroke-width', '1.5px');
     d3.selectAll('.focus line').style('stroke-dasharray', '3 3'); 
}
// private scalePointPosition(event,focus:any){
//     //마우스위치에 따른 그래프 좌표설정
//     this. x = event.offsetX-this.margin.left;
//     if (this.x < 0 || this.x > this.width) { return; }
//     this. xScaleValue = this.xScale.invert(this.x);  //x축 값
//     const i = Math.round(this.xScaleValue);     //x축 값 반올림
   
//     if(this.index==1){
//       this. yScaleValue = this.ecgData1[i];          //y축 값
//     }
//     else if(this.index==2){
//       this.yScaleValue = this.ecgData2[i];
//     }
//     else if(this.index==3){
//       this.yScaleValue = this.ecgData3[i];
//     }
//     else if(this.index==4){
//       this.yScaleValue = this.ecgData4[i];
//     }
//     else if(this.index==5){
//       this.yScaleValue = this.ecgData5[i];
//     }
//     // console.log(this.xScaleValue);
//     // console.log(this.yScaleValue.RespirationSignal);
//     focus.attr('transform', 'translate(' + this.x + ',' + this.yScale(this.yScaleValue.ecg_y) + ')');
    
//    //그래프 좌표에 눈금선 표시
//     focus.select('line.x')
//         .attr('x1', 0)
//         .attr('x2', this.xScale(this.xScaleValue)- this.width)
//         .attr('y1', 0)
//         .attr('y2', 0);
//     focus.select('line.y')
//         .attr('x1', 0)
//         .attr('x2', 0)
//         .attr('y1', 0)
//         .attr('y2', this.height - this.yScale(this.yScaleValue.ecg_y));
//    //정보 텍스트 표시
//    focus.select("text")
//         .datum(this.yScaleValue)
//         .attr("x", 10)
//         .attr("y", 10)
//         .attr("opacity", 1)
//         .html((d:any) => {
//            if(d.ArrhythmiaAnnotation!=null && d.ArrhythmiaAnnotation>0 )
//             return "<tspan  x='0' dy='1.2em' >" + 'Time: ' + d.Time + "</tspan>" 
//             + "<tspan x='0' dy='1.2em'>" + 'Signal: ' + d.ecg_y + "</tspan>"
//             + "<tspan x='0' dy='1.2em'>" + 'Arrhythmia: ' + d.ArrhythmiaAnnotation + "</tspan>";
//            else
//             return "<tspan  x='0' dy='1.2em' >" + 'Time: ' + d.Time + "</tspan>" 
//             + "<tspan x='0' dy='1.2em'>" + 'Signal: ' + d.ecg_y + "</tspan>";
//         });
//   }
}
