import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import Root from './components/Root.jsx'
import { configure } from './store'

const initialState = {
  data: {
    filters: {},
    heads: ['A', 'B', 'C'],
    rows: [
      {A: 'hello', B: 'redux', C: 'world'},
      {A: 'good night', B: 'and', C: 'good luck'}
    ]
  }
}

const store = configure(initialState)
const root = document.getElementById('main')

ReactDOM.render(<Provider store={store}><Root/></Provider>, root)
