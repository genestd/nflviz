import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../actions'
import '../styles/main.scss'

const AppHeader = props => {
  return (
    <header>
      <button className='nav-button' onClick={()=>{props.actions.toggleNav();}}>
        <i className='icon-chart-bar '></i>
      </button>
      <div className='header2'>
        <h2 className='heading'>
          Build custom NFL charts
        </h2>
      </div>
    </header>
  )
}

const mapStateToProps = (state) => {
  return ({
    chart: state.userInput.chart
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    actions: bindActionCreators(Actions, dispatch)
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader)
