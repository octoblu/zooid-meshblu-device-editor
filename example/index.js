import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MeshbluDeviceEditor from '../index'

class Example extends Component {
  state = {}

  componentDidMount = () => {
    var meshblu = new MeshbluHttp()
    var meshbluDevice = {
      "name": "whatever",
      "meshblu": {
        "schemas": {
          "configure": [
            {
              	"title": "YoAge",
              	"type": "object",
              	"properties": {
              		"firstName": {
              			"type": "string"
              		},
              		"lastName": {
              			"type": "string"
              		}
              	}
            },
            {
                "title": "YoDeets",
                "type": "object",
                "properties": {
                  "age": {
                    "type": "integer",
                    "title": "Age"
                  },
                  "bio": {
                    "type": "string",
                    "title": "Bio"
                  }
                }
              }
          ],
          "message": []
        }
      }
    }
    meshblu.register(meshbluDevice,(error, device) => {
      console.log('registered', device);
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
