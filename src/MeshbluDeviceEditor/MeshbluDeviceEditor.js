import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import ReactSchemaForm from 'react-jsonschema-form';

import SchemaSelector from '../SchemaSelector/SchemaSelector';

const propTypes = {
  device: PropTypes.object.isRequired,
};

export default class MeshbluDeviceEditor extends Component {
  constructor(props) {
    super(props);

    this.state =  {
      schemas: null,
      selectedSchema: null,
    };

    this.handleSchemaSelection = this.handleSchemaSelection.bind(this);
  }

  componentWillMount() {
    const error = this.validateSchema();

    if (error) {
      this.setState({ error });
    } else {
      const schemas = this.props.device.schemas['v1.0.0'];

      this.setState({ schemas });
      if (!_.isEmpty(schemas.device)) {
        this.setState({ selectedSchema: schemas.device });
      }
    }
  }

  validateSchema() {
    const { device } = this.props;

    const NO_DEVICE_MSG          = 'No device';
    const UNSUPPORTED_SCHEMA_MSG = 'Schema version not supported';
    const NO_SCHEMA_MSG          = 'Device has no schema';

    if (!device) return new Error(NO_DEVICE_MSG);
    if (_.isEmpty(device.schemas)) return new Error(NO_SCHEMA_MSG);
    if (!device.schemas['v1.0.0']) return new Error(UNSUPPORTED_SCHEMA_MSG);
    if (_.isEmpty(device.schemas['v1.0.0'])) return new Error(NO_SCHEMA_MSG);

    return null;
  }

  handleSchemaSelection(selectedSchema) {
    const { schemas } = this.state;

    this.setState({
      selectedSchema: schemas[selectedSchema],
    });
  }

  render() {
    const { error, schemas, selectedSchema } = this.state;

    if (error) return <div>{error.message}</div>;

    return (
      <div>
        <SchemaSelector
          schemas={_.keys(schemas)}
          selectedSchema={selectedSchema}
          onChange={this.handleSchemaSelection}
        />

        <ReactSchemaForm
          schema={selectedSchema}
          formData={{}}
          onSubmit={null}
        />
      </div>
    );
  }
}

MeshbluDeviceEditor.propTypes = propTypes;
