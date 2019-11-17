import React from 'react'
import ReactDOM from 'react-dom'
import { TamponList } from './components/TamponList'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<TamponList />, div)
  ReactDOM.unmountComponentAtNode(div)
})
