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
        onChange={this.handleChange}
      />
    );
  }
}

ReactDOM.render(<Example />, document.querySelector('#root'));
