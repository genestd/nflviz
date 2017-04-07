import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../actions'
import dataFields from '../data/dataFields'
import * as _ from 'underscore'
import * as d3 from 'd3'
import barChart from '../components/barChart'
import scatterPlot from '../components/scatterPlot'

class ChartContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      nflChart: {},
      ready: false,
      data: []
    }

    d3.csv( props.chart.file, function(error, data){
       data.forEach(function(d){
        for(var key in d){
          if(dataFields[key].numeric){
            d[key] = +d[key]
          }
        }
       })
       let nflChart = this.getChartTemplate(this.props.chart.type)
       nflChart.data(data).size(this.props.size).xAxisData(this.props.chart.xAxis).yAxisData(this.props.chart.yAxis).title(props.chart.title)

       this.setState({
        nflChart: nflChart,
        data: data,
        ready: true
      })
      d3.select('#chartContainer').call(this.state.nflChart)
      this.state.nflChart.draw()

    }.bind(this))
    this.updateDimensions = this.updateDimensions.bind(this)

  }

  getChartTemplate(type){
    let nflChart
    switch( type){
      case 'bargraph':
        nflChart = barChart().size(this.props.size)
        break
      case 'scatterplot':
        nflChart = scatterPlot().size(this.props.size)
        break
      case 'bubble':
        nflChart = bubble().size(this.props.size)
        break;
      default:
        nflChart = scatterPlot().size(this.props.size)
    }
    return nflChart
  }

  updateDimensions() {

    let w=window,
    d = document,
    documentElement = d.documentElement,
    body = d.getElementsByTagName('body')[0],
    winWidth = w.innerWidth || documentElement.clientWidth || body.clientWidth,
    winHeight = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;

    if (winWidth < this.props.minSize.width){
      winWidth = this.props.minSize.width
    }
    if (winHeight < this.props.minSize.height){
      winHeight = this.props.minSize.height
    }
    this.props.actions.updateDimensions({width: winWidth,
                                         height: winHeight-75
                                       });
  }

  componentWillMount() {
      this.updateDimensions();
  }

  componentDidMount(){

    window.addEventListener("resize", _.debounce(this.updateDimensions,250));
  }

  componentDidUpdate(){

    if (this.state.ready && this.props.sizeChange){
        this.state.nflChart.size(this.props.size).draw()
        this.props.actions.sizeChanged()
    } else if( this.state.ready && this.props.chartChange){
        d3.select('#chartContainer svg').remove()
        let newChart = this.getChartTemplate(this.props.chart.type)
        newChart.xAxisData(this.props.chart.xAxis)
                .yAxisData(this.props.chart.yAxis)
                .title(this.props.chart.title)
                .data(this.state.data)
                .draw()
        this.setState({nflChart: newChart})
        d3.select('#chartContainer').call(newChart)
        newChart.draw()
        this.props.actions.chartChanged()
        this.props.actions.dataChanged()
    } else if( this.state.ready && this.props.dataChange){
        this.state.nflChart.xAxisData(this.props.chart.xAxis)
                           .yAxisData(this.props.chart.yAxis)
                           .title(this.props.chart.title)
                           .data(this.state.data)
                           .draw()
        this.props.actions.dataChanged()
    }
  }

  componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions);
  }

  render(){
    return (
      <div>
        <div ref='container' id='chartContainer' className='chartContainer'>
        </div>
        <div id='tooltip'></div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return ({
    minSize: state.appState.minSize,
    margin: state.appState.margin,
    size: state.appState.size,
    sizeChange: state.appState.sizeChange,
    chart: state.userInput.chart,
    dataChange: state.userInput.dataChange,
    chartChange: state.userInput.chartChange
  })
};

const mapDispatchToProps = (dispatch) => {
  return ({
    actions: bindActionCreators(Actions, dispatch)
  })
};

export default connect( mapStateToProps, mapDispatchToProps)(ChartContainer)
