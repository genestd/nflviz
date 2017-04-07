import {combineReducers} from 'redux'
import appState from '../reducers/appState'
import userInput from '../reducers/userInput'

const rootReducer = combineReducers({
  appState: appState,
  userInput: userInput
})

export default rootReducer
