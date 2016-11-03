import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux';
import configureStore from './redux/store'

// import App from './components/app'
import App from './components_2/app'

let store = configureStore()

render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('app'))