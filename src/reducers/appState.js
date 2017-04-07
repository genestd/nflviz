import {
  TOGGLE_NAV,
  UPDATE_DIMENSIONS,
  SIZE_CHANGED
} from '../actions'

const INITIAL_STATE = { showNav: false,
                        navClass: "close",
                        minSize: {width: 750, height: 400},
                        margin: {top: 20, bottom: 20, right: 20, left: 70},
                        size: {width: 500, height:400},
                        sizeChange: false
                      }

const appState = function( state=INITIAL_STATE, action ){
  let newState = Object.assign({}, state)
  //newState.sizeChange = false
  switch( action.type ){
    case SIZE_CHANGED:
      newState.sizeChange = false
      return newState

    case TOGGLE_NAV:

      newState.showNav = newState.showNav === true ? false : true
      newState.navClass = newState.navClass === "open" ? "close" : "open"
      return newState
      break;

    case UPDATE_DIMENSIONS:

      newState.size = action.payload
      if( newState.size.width != state.size.width || newState.size.height != state.size.height){
        newState.sizeChange = true;
      }

      return newState
      break;

    default:
      return newState
  }
}

export default appState
