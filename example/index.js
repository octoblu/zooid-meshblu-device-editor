import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MeshbluDeviceEditor from '../index'

class Example extends Component {
  render() {
    return (
      <MeshbluDeviceEditor
        uuid="DEVICE-UUID"
        token="DEVICE-TOKEN"
      />
    )
  }
}

ReactDOM.render(<Example />, document.querySelector('#root'))
