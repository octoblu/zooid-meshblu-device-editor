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

### uuid (required)
Meshblu device uuid
### token (required)
Meshblu device token
### server
Meshblu server url, default is ```meshblu.ocotblu.com```
### port
Meshblu server port, default is ```443```



## Example

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MeshbluDeviceEditor from 'zooid-meshblu-device-editor'

class Example extends Component {
  render() {
    return (
      <MeshbluDeviceEditor
        uuid="YOUR-DEVICE-UUID"
        token="YOUR-DEVICE-TOKEN"
        server="meshblu.octoblu.com"
        port="443"  
      />
    )
  }
}

ReactDOM.render(<Example />, document.querySelector('#root'))
```

## License

MIT
