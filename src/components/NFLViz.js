import React from 'react'
import * as d3 from 'd3'
import dataFields from '../data/datafields'
import NFLBar from '../components/NFLBar'

export default class NFLViz extends React.Component{

  constructor(props){
    super(props)
    this.setContext = this.setContext.bind(this)
  }

  componentDidMount(){
    //Get data from external source if needed
    //Create the SVG canvas
    this.setContext();
  }

  componentDidUpdate(){
    //Remove and redraw the canvas
    d3.select('#nflsvg').remove()
    d3.select('#nfltip').remove()
    this.setContext()
  }

  setContext(){
    /*D3 logic goes here
     . add svg element
     . add gradient if desired
     . set the scales
     . normalize data
     . add the points
     . add the axes
     . add the axis labels
    */
    let height = this.props.height - this.props.margin.top - this.props.margin.bottom - 150
    let width = this.props.width - this.props.margin.left - this.props.margin.right
    let margin = this.props.margin

    let div = d3.select(this.refs.tooltip)
      .append('div')
      .attr('class','tooltip')
      .attr('id','nfltip')
      .style("opacity", "0")

    let x = d3.scaleLinear().range([0,width])
    let y = d3.scaleLinear().range([height, 0])

    let context = d3.select(this.refs.nflchart)
      .append('svg')
      .attr('height', this.props.height)
      .attr('width', this.props.width)
      .attr('id', 'nflsvg')
      .append('g')
      .attr( 'transform', 'translate(' + this.props.margin.left + ', ' + this.props.margin.top + ')')

    let defs = context.append("defs")

    d3.csv('data.csv', function(error, data){
      if (error){
        console.log('A data error occurred')
      }

      //format required fields as numeric
      data.forEach( function(d){
        d.WINS = +d.WINS
        d.DEF_AVG_PTS = +d.DEF_AVG_PTS
        d.OFF_AVG_PTS = +d.OFF_AVG_PTS

        defs.append('svg:pattern')
           .attr('id', d.NICK )
           .attr('patternContentUnits', 'objectBoundingBox')
           .attr('viewBox','0 0 1 1')
           .attr('preserveAspectRatio',"xMidYMid slice")
           .attr('width', '100%')
           .attr('height', '100%')
           .append('svg:image')
           .attr('xlink:href', 'icons/' + d.NICK + '_logo.svg')
           .attr('width', 1)
           .attr('height', 1)
           .attr('preserveAspectRatio',"xMidYMid slice")
      })

      x.domain([0, 16])
      y.domain([d3.min(data,function(d){return d.OFF_AVG_PTS}), d3.max(data, function(d){return d.OFF_AVG_PTS})])

      context.selectAll('dot')
        .data(data)
        .enter().append('circle')
        .attr('r', 20)
        .attr('cx', function(d){ return x(d.WINS) })
        .attr('cy', function(d){ return y(d.OFF_AVG_PTS)})
        .attr('fill', function(d){ return 'url("#' + d.NICK + '")' })
        .on("mouseover", function(d) {
           div.transition()
           .duration(200)
           .style("opacity", .9);
           div.html("Team: " + d.Tm + "<br/>Wins: " + d.WINS + "<br/>Pts/Drv: " + d.OFF_AVG_PTS)
           .style("left", (d3.event.pageX-80) + "px")
           .style("top", (d3.event.pageY - 28) + "px");
         })
       .on("mouseout", function(d) {
         div.transition()
         .duration(500)
         .style("opacity", 0);
       })

       //add x axis
       context.append('g')
         .attr('class','axis')
         .attr('transform', 'translate(0,' + height + ')')
         .call( d3.axisBottom(x))

       context.append('text')
         .attr('class','axisLabel')
         .attr('x', width/2)
         .attr('y', height + 50)
         .text('Wins')

       //add y axis
       context.append('g')
         .attr('class','axis')
         .call(d3.axisLeft(y))

       context.append('text')
         .attr('class','axisLabel')
         .attr('x', 0-height/2)
         .attr('y', 0-margin.left)
         .attr('transform', 'rotate(-90)')
         .attr("dy","1em")
         .text('Average Offensive points per drive')

    })  //end of d3.csv
  }

  formatTitle(){
    let title
    switch( this.props.chart.type ){
      case 'scatterplot':
        title = this.props.chart.description + ' of ' + dataFields[this.props.chart.yAxis].description + ' related to ' + dataFields[this.props.chart.xAxis].description
        break

      case 'bargraph':
        title = this.props.chart.description + ' of ' + dataFields[this.props.chart.yAxis].description + ' vs. ' + dataFields[this.props.chart.xAxis].description
        break

      case 'bubble':
        title = this.props.chart.description + ' showing the effect of ' + dataFields[this.props.chart.yAxis].description + ' on ' + dataFields[this.props.chart.yAxis].description + ' vs. ' + dataFields[this.props.chart.xAxis].description
        break

      default:
        title = 'NFL Visualization'
    }
    return title
  }

  render(){
    return (
      <div>
        <h1 className="title">{this.formatTitle()}</h1>
        <div ref="nflchart"></div>
        <div ref="tooltip"></div>
        <NFLBar height={this.props.height}
                width={this.props.width}
                margin={this.props.margin}
                chart={this.props.chart}/>
      </div>
    )
  }
}
