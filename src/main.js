import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import Root from './components/Root.jsx'
import { configure, getInitialState } from './store'
import './styles/main.css'

const initialState = getInitialState()
const store = configure(initialState)
const root = document.getElementById('main')

ReactDOM.render(<Provider store={store}><Root/></Provider>, root)
