import * as d3 from 'd3'

module.exports = {
  recalcMargins( xAxis, yAxis, margin){
    let recalc = false
    let defaultLabel = 39
    let longestXLabel  = 0
    let longestYLabel = 0
    xAxis.selectAll('text')
         .style('fill', function(d){ if(this.getBBox().width > longestXLabel){longestXLabel = this.getBBox().width}; return '#000'})

    yAxis.selectAll('text')
         .style('fill', function(d){ if(this.getBBox().width > longestYLabel){longestYLabel = this.getBBox().width}; return '#000'})

    if(longestYLabel + defaultLabel > margin.left){
       margin.left = longestYLabel + defaultLabel
       recalc = true
       console.log(recalc)
    }
    if(longestXLabel + defaultLabel > margin.bottom){
      margin.bottom = longestXLabel + defaultLabel
      recalc = true
      console.log(recalc)
    }
    return recalc
  }

}
