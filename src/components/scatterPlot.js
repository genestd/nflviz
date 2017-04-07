import * as d3 from 'd3'
import * as helpers from '../components/chartHelpers'

function scatterPlot(){

  let data = [];
  let xAxisData = { field: '',
                    description: '',
                    scale: ''
                  }
  let yAxisData = { field: '',
                    description: '',
                    scale: ''
                  }
  let size = { width: 500, height: 400}
  let title = 'NFL Visualization'

  let updateData, updateSize, updateXAxisData, updateYAxisData, updateTitle, drawChart

  function chart(selection){

    selection.each( function(){
      //set up the width+height
      let margin = { top: 40, right: 40, bottom: 60, left: 70}
      let fillColor = 'steelBlue'
      let chartHeight = size.height - margin.top - margin.bottom
      let chartWidth = size.width - margin.left - margin.right
      let widthScale, heightScale

      //set up the scales
      widthScale = getScale(xAxisData, 'x')
      heightScale = getScale(yAxisData, 'y')
      let dom = d3.select(this)
      let svg = dom.append('svg')
                  .style('fill', fillColor)

      let defs = svg.append('defs')
      data.forEach( function(d){
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

      d3.selectAll('#tooltip div').remove()
      let tooltip = d3.select('#tooltip')
                 .append('div')
                 .attr('class', 'tooltip')
                 .attr('id', 'tooltip')
                 .style('opacity', 0)

      let chartArea = svg.append('g')

      let dots = chartArea.selectAll('circle.display-dot')

      let xAxis = chartArea.append('g')
                   .attr('class', 'axis')
                   .call(d3.axisBottom(widthScale))
       xAxis.selectAll("text")
           .style("text-anchor", 'end')
           .style('fill', '#000')
           .attr("dx", "-.8em")
           .attr("dy", ".15em")
           .attr("transform", "rotate(-65)" )

      let xLabel = chartArea.append('text')
                    .attr('class', 'axisLabel')
                    .attr('dx', '1em')
      let yAxis = chartArea.append('g')
                   .attr('class','axis')
                   .call(d3.axisLeft(heightScale))
      let yLabel = chartArea.append('text')
                    .attr('class', 'axisLabel')
                    .attr('transform', 'rotate(-90)')
                    .attr('dy', '1em')
      let chartTitle = chartArea.append('text')
                    .attr('class', 'chartTitle')
                    .style('text-anchor', 'middle')

      drawChart = function(){
        svg.transition().duration(600)
            .attr('width', size.width)
            .attr('height', size.height)

        chartWidth = size.width - margin.left - margin.right
        chartHeight = size.height - margin.top - margin.bottom
        widthScale = getScale(xAxisData, 'x')
        heightScale = getScale(yAxisData, 'y')

        xAxis = xAxis.call(d3.axisBottom(widthScale))
        yAxis = yAxis.call(d3.axisLeft(heightScale))

        if( helpers.recalcMargins(xAxis, yAxis, margin)){
          chartWidth = size.width - margin.left - margin.right
          chartHeight = size.height - margin.top - margin.bottom
          widthScale = getScale(xAxisData, 'x')
          heightScale = getScale(yAxisData, 'y')
        }

        chartArea.transition().duration(600)
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

        let update = chartArea.selectAll('circle.display-dot')
              .data(data)

        update.exit()
              //.transition().duration(650)
              //.delay(function(d, i) { return (data[yAxisData.field].length - i) * 20; })
              .style('opacity',0)
              .attr('width', 0)
              .attr('y',0)
              .attr('height', 0)
              .remove()

        update.transition()
              .duration(600)
              .attr('cx', function(d){ return widthScale(d[xAxisData.field]) })
              .attr('cy', function(d){ return  heightScale(d[yAxisData.field])})
              .attr('r', 20)

        update.enter()
              .append('circle')
              .attr('class', 'display-dot ')
              .attr('cx', function(d){ return widthScale(d[xAxisData.field]) })
              .attr('cy', function(d){ return heightScale(d[yAxisData.field])})
              .attr('r', 20)
              .attr('fill', function(d){ return( 'url("#' + d.NICK + '")')})
              .on('mouseover', function(d) {
                 tooltip.transition()
                 .duration(200)
                 .style("opacity", .8);
                 tooltip.html('<b>' + xAxisData.description + ':</b> ' + d[xAxisData.field] + '<br/><b>' + yAxisData.description + ': </b>' + d[yAxisData.field])
                 .style("left", (d3.event.pageX-80) + "px")
                 .style("top", (d3.event.pageY - 28) + "px");
               })
             .on("mouseout", function(d) {
               tooltip.transition()
               .duration(500)
               .style("opacity", 0);
             })
              .style('opacity', 0)
              .transition().duration(600)
              .style('opacity',1)

        yAxis.transition().duration(600)
             .call(d3.axisLeft(heightScale));
        xAxis.transition().duration(600)
             .attr("transform", "translate(0," + chartHeight + ")")
             .call(d3.axisBottom(widthScale))
       xAxis.selectAll("text")
           .style("text-anchor", 'end')
           .style('fill', '#000')
           .attr("dx", "-.8em")
           .attr("dy", ".15em")
           .attr("transform", "rotate(-65)" )
        yLabel.transition().duration(600)
              .attr("x", 0-chartHeight/2)
              .attr('y', 0-margin.left)
              .text(yAxisData.description)
        xLabel.transition().duration(600)
              .attr("x", chartWidth/2)
              .attr("y", chartHeight + margin.bottom-10)
              .text(xAxisData.description)
        chartTitle.transition().duration(600)
              .attr('x', chartWidth/2)
              .attr('y', 0-margin.top/3)
              .text(title)

      }

      function getScale( axis, dir ){
        let scale
        switch( axis.scale){
          case 'linear':
            scale = d3.scaleLinear()
                    .domain([d3.min(data, function(d){return d[axis.field]}), d3.max(data,function(d){return d[axis.field]})])
            if( dir === 'y'){
              scale.range([chartHeight,0])
            } else {
              scale.range([0,chartWidth])
            }
          break
          case 'ordinal':
            scale = d3.scaleBand()
                     .padding(.1)
                     .domain( data.map(function(d){return d[axis.field]}))
            if( dir === 'y'){
              scale.range([chartHeight, 0])
            } else {
              scale.range([0,chartWidth])
            }
          break
          case 'time':
            scale = d3.scaleTime()
                     .domain( d3.extent( data, function(d){ return d[axis.field]}))
            if( dir === 'y'){
              scale.range([chartHeight,0])
            } else {
              scale.range([0,chartWidth])
            }
          break
          default:
            scale = d3.scaleLinear()
                     .domain([d3.min(data, function(d){return d[axis.field]}), d3.max(data,function(d){return d[axis.field]})])
                     .range([0, chartWidth])
          }
          return scale
      }
    })
  }
  chart.size = function(value){
    if(!arguments.length) return size
    size = value
    return chart
  }

  chart.data = function(value){
    if(!arguments.length) return data
    data = value
    return chart
  }

  chart.xAxisData = function(value){
    if(!arguments) return xAxisData
    xAxisData = value
    return chart
  }

  chart.yAxisData = function(value){
    if(!arguments) return yAxisData
    yAxisData = value
    return chart
  }

  chart.fillColor = function(value){
    if(!arguments.length) return fillColor
    fillColor = value
    return chart
  }

  chart.title = function(value){
    if(!arguments.length) return title
    title = value
    return chart
  }

  chart.draw = function(){
    if(typeof drawChart === 'function') drawChart()
  }

  return chart
}

export default scatterPlot
