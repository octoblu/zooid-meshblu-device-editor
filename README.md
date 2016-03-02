# zooid-meshblu-device-editor

A React component for editing Meshblu devices

[![Build Status](https://travis-ci.org/octoblu/zooid-meshblu-device-editor.svg?branch=master)](https://travis-ci.org/octoblu/zooid-meshblu-device-editor)
[![npm version](https://badge.fury.io/js/zooid-meshblu-device-editor.svg)](http://badge.fury.io/js/zooid-meshblu-device-editor)
[![Gitter](https://badges.gitter.im/octoblu/help.svg)](https://gitter.im/octoblu/help)

## Installing

```bash
$ npm install zooid-meshblu-device-editor
```

Include meshblu-http in your index.html:
```html
<script src="https://cdn.octoblu.com/js/browser-meshblu-http/v1.2.0/meshblu-http.bundle.js"></script>
```

## Props

### uuid (required)
Meshblu device uuid
### meshbluConfig (object) (required)
```js
{ uuid: 'device-uuid', token: 'device-token', server: 'meshblu.octoblu.com', port: 443 }
```

## Example

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MeshbluDeviceEditor from 'zooid-meshblu-device-editor'

class Example extends Component {
  render() {
    return (
      <MeshbluDeviceEditor
        uuid="THE-DEVICE-UUID"
        meshbluConfig={
          uuid: 'AUTH-UUID',
          token: 'AUTH-TOKEN',
          server: 'meshblu.octoblu.com',
          port: 443
        }
      />
    )
  }
}

ReactDOM.render(<Example />, document.querySelector('#root'))
```

## License

MIT
