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
import MeshbluDeviceEditor from 'zooid-meshblu-device-editor'

class Example extends Component {
  handleChange = (properties) => {
    let meshbluHttp = new MeshbluHttp(meshbluConfig)
    meshbluHttp.update(device.uuid, properties, (error) => {
      console.log('updated', {error})
    })
  }
  render() {
    const {device} = this.state

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
