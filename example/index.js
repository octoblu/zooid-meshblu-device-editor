import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MeshbluDeviceEditor from '../src/MeshbluDeviceEditor/MeshbluDeviceEditor';

import ExampleDevice from './example-device.json';

class Example extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const device = ExampleDevice;
    this.setState({ device });
  }

  componentDidMount() {
    // var meshblu = new MeshbluHttp();

    // meshblu.register({
    //   name: 'BEEZZZ',
    //   optionsSchema: {
    //     type: 'object',
    //     properties: {
    //       'buzz': {type: 'boolean'}
    //     }
    //   }}, (error, device) => {
    //   this.setState({device})
    //   this.meshblu = new MeshbluHttp(this.state.device)
    // })
  }

  handleChange({ name, options }) {
    // this.meshblu.updateDangerously(this.meshblu.uuid, {$set: {name, options}}, (error) => {
    //   console.log('updated', {error})
    // })
  }

  render() {
    const { device } = this.state;
    if (!device) return <h1>Loading</h1>;

    return (
      <MeshbluDeviceEditor
        device={device}
        onChange={this.handleChange}
      />
    );
  }
}

ReactDOM.render(<Example />, document.querySelector('#root'));
