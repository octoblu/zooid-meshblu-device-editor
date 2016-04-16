import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import MeshbluDevice from './device.json'
import MeshbluDeviceEditor from '../index'

class ExampleSelection extends Component {
  state = {}

  constructor(props) {
    super(props)

    const uuid    = "66f0aa2b-e177-43f0-a9d6-782033ebe806"
    const token   = "9542c440298850a33f6353e9d96a68a31a8ce95a"
    const options = {
      uuid,
      token,
      hostname: 'meshblu.octoblu.dev',
      port: 443
    }

    this.meshblu = new MeshbluHttp(options)
  }

  componentDidMount = () => {
    this.meshblu.whoami((error, device) => {
      console.log("whoami", device)
      this.setState({device})
    })
  }

  handleChange = ({name, options}) => {
    console.log('name', name)
    this.meshblu.update(this.state.device.uuid, {name, options}, (error, response) => {
      console.error({error})
      console.log('updated', response)
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
