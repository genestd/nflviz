import * as d3 from 'd3'
import * as helpers from '../components/chartHelpers'

function barChart(){
  console.log('defaults')
  // Variables that can be modified externally
  let data = [{Label: '',
              Value: ''}]
  let xAxisData = {field: 'Tm', Description: 'Team'}
  let yAxisData = {field: 'WINS', Description: 'Wins'}
  let size = { width: 950,
               height: 400
            }
  let title = 'NFL Visualization'
  let updateData, updateSize, drawChart

  function chart(selection){

    selection.each(function(){
      let fillColor = 'steelBlue'
      let margin={top: 40, right: 20, left: 40, bottom: 60}
      let chartWidth = size.width - margin.left - margin.right
      let chartHeight = size.height - margin.top - margin.bottom
      let widthScale = d3.scaleBand().padding(.1).range([0, chartWidth]).domain(data.map(function(d){return d[xAxisData.field]}))
      let heightScale = d3.scaleLinear()
                          .domain([d3.min(data, function(d){ return d[yAxisData.field]})-1, d3.max(data, function(d){return d[yAxisData.field]})+1])
                          .range([chartHeight,0])

      let dom = d3.select(this)
      let svg = dom.append('svg')
          .style('fill', fillColor)

      let defs = svg.append('defs')
      //format required fields as numeric
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

      let bars = chartArea.selectAll('rect.display-bar')
        .data(data)
        .append('rect')
        .attr('class', 'display-bar')

      let logos = chartArea.selectAll('dot')
        .data(data)
        .enter().append('circle')

      // Add the X Axis
      let xLabel = chartArea.append("text")
        .attr("class", "axisLabel")

      let xAxis = chartArea.append("g")
        .attr("class", "axis")
        .call(d3.axisBottom(widthScale))

        xAxis.selectAll("text")
            .style("text-anchor", 'end')
            .style('fill', '#000')
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)" )

      // Add the Y Axis
      let yAxis = chartArea.append("g")
           .attr("class", "axis")
           .call(d3.axisLeft(heightScale));

      let yLabel = chartArea.append("text")
        .attr("class", "axisLabel")
        .attr("transform", "rotate(-90)")
        .attr("dy","1em")

      let chartTitle = chartArea.append('text')
        .attr('class', 'chartTitle')
        .style('text-anchor', 'middle')

      drawChart = function(){
        svg.transition().duration(600)
            .attr('width', size.width)
            .attr('height', size.height)

        chartWidth = size.width - margin.left - margin.right
        chartHeight = size.height - margin.top - margin.bottom
        widthScale = d3.scaleBand().range([0, chartWidth]).padding(.1).domain(data.map(function(d){return d[xAxisData.field]}))
        heightScale = d3.scaleLinear()
                        .domain([d3.min(data, function(d){ return d[yAxisData.field]})-1, d3.max(data, function(d){return d[yAxisData.field]})+1])
                        .range([chartHeight,0])

        xAxis = xAxis.call(d3.axisBottom(widthScale))
        yAxis = yAxis.call(d3.axisLeft(heightScale))
        if( helpers.recalcMargins( xAxis, yAxis, margin)){
          chartWidth = size.width - margin.left - margin.right
          chartHeight = size.height - margin.top - margin.bottom
          widthScale = d3.scaleBand().range([0, chartWidth]).padding(.1).domain(data.map(function(d){return d[xAxisData.field]}))
          heightScale = d3.scaleLinear()
                          .domain([d3.min(data, function(d){ return d[yAxisData.field]})-1, d3.max(data, function(d){return d[yAxisData.field]})+1])
                          .range([chartHeight,0])
        }

        chartArea.transition().duration(600)
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

        let update = chartArea.selectAll('rect.display-bar')
                      .data(data)

        update.exit()
              //.transition().duration(650)
              //.delay(function(d, i) { return (data.length - i) * 20; })
              .style('opacity',0)
              .attr('width', 0)
              .attr('y',0)
              .attr('height', 0)
              .remove()

        update.transition()
              .duration(600)
              .attr('x', function(d,i){ return widthScale(d[xAxisData.field])})
              .attr('width', widthScale.bandwidth())
              .attr('y', function(d){ return heightScale(d[yAxisData.field])})
              .attr('height', function(d){ return chartHeight-heightScale(d[yAxisData.field])})

        update.enter()
              .append('rect')
              .attr('class', 'display-bar')
              .attr('x', function(d,i){ return widthScale(d[xAxisData.field])})
              .attr('width', widthScale.bandwidth())
              .attr('y', function(d){return heightScale(d[yAxisData.field])})
              .attr('height', 0)
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
              .delay(function(d, i) { return (i) * 30; })
              .attr('height', function(d,i){ return chartHeight - heightScale(d[yAxisData.field])})
              .style('opacity',1)

        logos.transition().duration(600)
             .attr('r', widthScale.bandwidth()/2)
             .attr('cx', function(d){ return widthScale(d[xAxisData.field]) + widthScale.bandwidth()/2})
             .attr('cy', function(d){ return heightScale(d[yAxisData.field])-widthScale.bandwidth()/2})
             .attr('fill', function(d){ return 'url("#' + d.NICK + '")' })

        yAxis.transition().duration(600)
             .call(d3.axisLeft(heightScale));
        xAxis.transition().duration(600)
             .attr("transform", "translate(0," + chartHeight + ")")
             .call(d3.axisBottom(widthScale))

        yLabel.transition().duration(600)
              .attr("x", 0-chartHeight/2)
              .attr("y", 0-margin.left+5)
              .text(yAxisData.description)
        xLabel.transition().duration(600)
              .attr("x", chartWidth/2)
              .attr("y", chartHeight + margin.bottom-5)
              .text(xAxisData.description)

        chartTitle.transition().duration(600)
             .attr('x', chartWidth/2)
             .attr('y', 0-margin.top/3)
             .text(title)
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

export default barChart
