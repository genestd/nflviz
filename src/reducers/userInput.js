import {
  PROCESS_FORM,
  DATA_CHANGED,
  CHART_CHANGED
} from '../actions'
import dataFields from '../data/datafields'

const charts = [
 { type: 'scatterplot',
   description: 'Scatter Plot',
   file: 'data.csv',
   xAxis: {field: 'WINS', description: 'Wins', scale: 'linear'},
   yAxis: {field: 'OFF_AVG_PTS', description: 'Offensive Average Points per Drive', scale: 'linear'},
   zAxis: {field: '', description: '', scale: ''},
   title: 'Offensive Avg Points per Drive related to Wins'
},
{ type: 'bargraph',
  description: 'Bar Graph',
  file: 'data.csv',
  xAxis: {field: 'NICK', description: 'Team', scale: 'ordinal'},
  yAxis: {field: 'WINS', description: 'Wins', scale: 'linear'},
  zAxis: {field: '', description: '', scale: ''},
  title: 'Wins vs. Teams'
},
{ type: 'bubble',
  description: 'Bubble Graph',
  file: 'data.csv',
  xAxis: {field: 'WINS', description: 'Wins', scale: 'linear'},
  yAxis: {field: 'OFF_AVG_PTS', description: 'Offensive Average Points per Drive', scale: 'linear'},
  zAxis: {field: 'OFF_AVG_TIME', description: 'Offensive Average Time of Drive', scale: 'time'},
  title: 'Effect of Offensive Avg Drive Time on Wins vs. Offensive Avg Points'
  }
]

const INITIAL_STATE = { chart: charts[0],
                        dataChange: false,
                        chartChange: false
                      }

function formatTitle(chart){

  switch( chart.type ){
    case 'scatterplot':
      chart.title = dataFields[chart.yAxis.field].description + ' related to ' + dataFields[chart.xAxis.field].description
      break

    case 'bargraph':
      chart.title = dataFields[chart.yAxis.field].description + ' vs. ' + dataFields[chart.xAxis.field].description
      break

    case 'bubble':
      chart.title = 'Effect of ' + dataFields[chart.yAxis.field].description + ' on ' + dataFields[chart.yAxis.field].description + ' vs. ' + dataFields[chart.xAxis.field].description
      break

    default:
      chart.title = 'NFL Visualization'
  }
}

function getDesc( c_type ){
  let desc = 'unknown'
  for( let i=0; i<charts.length; i++){
    if (charts[i].type === c_type){
      desc = charts[i].description
    }
  }
  return desc
}

const userInput = function( state=INITIAL_STATE, action ){
  let newState = Object.assign({}, state)

  switch( action.type ){

    case DATA_CHANGED:
      newState.dataChange = false
      return newState

    case CHART_CHANGED:
      newState.chartChange = false
      return newState

    case PROCESS_FORM:

      //Get description of this chart from the default charts
      let description = getDesc( action.payload.chartType)

      //Set properties for the new chart object
      let newChart = {
        type: action.payload.chartType,
        description: description,
        xAxis: action.payload.x,
        yAxis: action.payload.y,
        zAxis: action.payload.z
      }
      formatTitle( newChart)


      newState = Object.assign({},state,{chart: newChart})
      if( state.chart.xAxis.field != action.payload.x.field ||
          state.chart.yAxis.field != action.payload.y.field ||
          state.chart.zAxis.field != action.payload.z.field ){
        newState.dataChange = true
      } else {
        newState.dataChange = false
      }

      if( newState.chart.type != state.chart.type){
        newState.chartChange = true
      } else {
        newState.chartChange = false
      }

      return newState
      break;

    default:
      return newState
  }
}

export default userInput
