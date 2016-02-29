import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MeshbluDeviceEditor from '../index'

class Example extends Component {
  render() {
    return (
      <MeshbluDeviceEditor
        uuid="3027e07d-87d5-4dde-b28d-65ac7a810099"
        token="b69508202c97c59f6c76f417cba8167aa1010c76"
      />
    )
  }
}

ReactDOM.render(<Example />, document.querySelector('#root'))
