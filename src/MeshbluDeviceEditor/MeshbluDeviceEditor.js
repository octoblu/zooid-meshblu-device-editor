import React, { Component, PropTypes } from 'react';
import ReactSchemaForm from 'react-jsonschema-form';

export default class MeshbluDeviceEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      device: null,
      selectedSchema: null,
    };
  }

  componentDidMount() {
    const { device } = this.props;
    this.setState({ device });
  }

  componentWillReceiveProps({ device }) {
    this.setState({ device });
  }

  render() {
    const { device, selectedSchema } = this.state;

    if (!device) return null;

    const schemas      = device.schemas['v1.0.0'];
    const deviceSchema = schemas.device;

    if (deviceSchema) {
      return (
        <ReactSchemaForm
          schema={selectedSchema}
        />
      );
    }

    return null;
  }
}
