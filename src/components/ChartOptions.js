import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../actions'
import dataFields from '../data/dataFields'

class ChartOptions extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      chartType: props.userInput.chart.type,
      x: props.userInput.chart.xAxis,
      y: props.userInput.chart.yAxis,
      z: props.userInput.chart.zAxis
    }

  }

  handleSelectChartEvent = (e) => {
    if (e.target.value === 'bargraph'){
      this.handleSelectAxisEvent({target: {name: 'xAxis',
                                           value: 'Tm'}
                                  })
    }
    this.setState({
      chartType: e.target.value,
    })
  }

  handleSelectAxisEvent = (e) => {
    let axis = e.target.name.charAt(0)
    let descp = dataFields[e.target.value].description
    let scl = dataFields[e.target.value].scale
    let field = e.target.value
    field = field === 'Tm' ? 'NICK' : field
    this.setState({
      [axis]: { field: field, description: descp, scale: scl }
    })
  }

  submitForm = () => {
    this.props.actions.processForm(this.state)
    this.props.actions.toggleNav()
  }

  renderZAxis(){
    if (this.state.chartType === 'bubble'){
      return (
        <div>
        <hr/>
        <i className='icon-resize-vertical'></i> Z-Axis Value:
        <select name='zAxis' value={this.state.z.field} onChange={(e)=>this.handleSelectAxisEvent(e)}>
        {Object.keys(dataFields).map( function(result,index){
          let selected = (result === this.state.z.field ? 'selected' : '')
          if( dataFields[result].chartable && result != this.state.x.fields && result != this.state.y.fields){
              return(<option key={index} value={result}>{dataFields[result].description}</option>)
            }
          }.bind(this)) }
          </select>
        <hr/>
        </div>
      )
    }
  }

  render(){

    return(
      <div className={ "overlay overlay-slide " + this.props.navClass}>
        <button className="overlay-close pointer"
                onClick={()=>this.props.actions.toggleNav()}>
                <i className="icon-cancel"></i>
        </button>


        <div className="form-style">
          <h2>Options</h2>
          <form>
            <div>
              <i className='icon-chart-line'></i>Chart Type:
              <select name='type' value={this.state.chartType} onChange={(e)=>this.handleSelectChartEvent(e)}>
                <option value='scatterplot'>Scatter Plot</option>
                <option value='bargraph'>Bar Graph</option>
                {/*<option value='bubble'>Bubble Chart</option>*/}
              </select>
              <hr/>
            </div>
            <div>
              <i className='icon-resize-horizontal'></i> X-Axis Value:
              <select name='xAxis' value={this.state.x.field} onChange={(e)=>this.handleSelectAxisEvent(e)}
                      disabled={this.state.chartType === 'bargraph'}>
              {Object.keys(dataFields).map( function(result,index){
                  let selected = (result === this.state.x.field ? 'selected' : '')
                  if( dataFields[result].chartable && result != this.state.y.field && result != this.state.z.field){
                    return(<option key={index} value={result}>{dataFields[result].description}</option>)
                  }
                }.bind(this))
              }
              </select>
              <hr/>
              <i className='icon-resize-vertical'></i> Y-Axis Value:
              <select name='yAxis' value={this.state.y.field} onChange={(e)=>this.handleSelectAxisEvent(e)}>
              {Object.keys(dataFields).map( function(result,index){
                let selected = (result === this.state.y.field ? 'selected' : '')
                if( dataFields[result].chartable && result != this.state.x.field && result != this.state.z.field
                                                 && dataFields[result].description != this.state.x.description){
                    return(<option key={index} value={result}>{dataFields[result].description}</option>)
                  }
                }.bind(this))
              }
              </select>

              {this.renderZAxis()}
          </div>
            <input type="button" value="Update Chart" onClick={()=>this.submitForm()}/>
          </form>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    userInput: state.userInput,
    navClass: state.appState.navClass
  })
};

const mapDispatchToProps = (dispatch) => {
  return ({
    actions: bindActionCreators(Actions, dispatch)
  })
};

export default connect( mapStateToProps, mapDispatchToProps)(ChartOptions)
