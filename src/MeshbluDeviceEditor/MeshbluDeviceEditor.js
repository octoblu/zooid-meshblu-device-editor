import React, { Component, PropTypes } from 'react';
import ReactSchemaForm from 'react-jsonschema-form';

const defaultState = {
  device: null,
  selectedSchema: null,
};

const propTypes = {
  device: PropTypes.object.isRequired,
};

export default class MeshbluDeviceEditor extends Component {
  constructor(props) {
    super(props);

    this.state     = defaultState;
    this.propTypes = propTypes;
  }

  componentDidMount() {
    // const { device } = this.props;
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
