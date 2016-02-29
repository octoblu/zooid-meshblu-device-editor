import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MeshbluDeviceEditor from '../index'

class Example extends Component {
  render() {
    return <MeshbluDeviceEditor />
  }
}

ReactDOM.render(<Example />, document.querySelector('#root'))
