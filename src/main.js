import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import Root from './components/Root.jsx'
import { configure } from './store'
import './styles/main.css'

const store = configure()
const root = document.getElementById('main')

ReactDOM.render(<Provider store={store}><Root/></Provider>, root)
