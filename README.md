# zooid-meshblu-device-editor

A React component for editing Meshblu devices

[![Build Status](https://travis-ci.org/octoblu/zooid-meshblu-device-editor.svg?branch=master)](https://travis-ci.org/octoblu/zooid-meshblu-device-editor)
[![npm version](https://badge.fury.io/js/zooid-meshblu-device-editor.svg)](http://badge.fury.io/js/zooid-meshblu-device-editor)
[![Gitter](https://badges.gitter.im/octoblu/help.svg)](https://gitter.im/octoblu/help)

## Installing

```bash
$ npm install zooid-meshblu-device-editor
```

## Props

### device [object] (required)
### onChange [func] (required)

## Example

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MeshbluDeviceEditor from '../index'

class Example extends Component {
  state = {}

  componentDidMount = () => {
    var meshblu = new MeshbluHttp()
    meshblu.register({
      name: 'BEEZZZ',
      optionsSchema: {
        type: 'object',
        properties: {
          'buzz': {type: 'boolean'}
        }
      }},(error, device) => {
      this.setState({device})
      this.meshblu = new MeshbluHttp(this.state.device)
    })
  }

  handleChange = ({name, options}) => {
    console.log({name, options})
    this.meshblu.updateDangerously(this.meshblu.uuid, {$set: {name, options}}, (error) => {
      console.log('updated', {error})
    })
  }

  render = () => {
    const {device} = this.state
    if(!device) return <h1>Loading</h1>
    return (
      <MeshbluDeviceEditor
        device={device}
        onChange={this.handleChange}
      />
    )
  }
}

ReactDOM.render(<Example />, document.querySelector('#root'))
```

## License

MIT
