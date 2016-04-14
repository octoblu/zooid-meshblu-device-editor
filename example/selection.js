import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MeshbluDevice from './device-v2.json'
import MeshbluDeviceEditor from '../index'

class ExampleSelection extends Component {
  state = {}

  componentDidMount = () => {
    const uuid = "4c868a60-36d4-471c-86c8-5db5818e3d70"
    const token = "9a85185727f7c1046ff18faea071fb6e64fcaf91"

    // const uuid  = "510bc4cc-dd82-4d4a-9261-bdd242805039"
    // const token = "10ccaff9b277b34e4ee9f1e9fecced45639fc266"

    const options = {
      uuid,
      token,
      hostname: 'meshblu.octoblu.dev',
      port: 443
    }

    const meshblu = new MeshbluHttp(options)

    meshblu.whoami((error, device) => {
      console.log("whoami", device)
      this.setState({device})
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

ReactDOM.render(<ExampleSelection />, document.querySelector('#root'))
