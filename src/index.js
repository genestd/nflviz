import React from 'react'
import {render} from 'react-dom'
import store from './utils/store'
import {Provider} from 'react-redux'
import './styles/main.scss'

import NFLApp from './components/NFLApp'

const rootElement = document.getElementById('app');

render(
  <Provider store={store}>
        <NFLApp className='nflapp'/>
  </Provider>,
  rootElement
);
