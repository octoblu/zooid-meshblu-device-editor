import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import ReactSchemaForm from 'react-jsonschema-form';
import { Validator } from 'jsonschema';

import SchemaSelector from '../SchemaSelector/SchemaSelector';
import validationSchema from '../validation-schema.json';

const propTypes = {
  device: PropTypes.object.isRequired,
};

export default class MeshbluDeviceEditor extends Component {
  constructor(props) {
    super(props);

    this.state =  {
      schemas: null,
      selectedSchema: null,
      errors: null,
    };

    this.validator = new Validator();
    this.handleSchemaSelection = this.handleSchemaSelection.bind(this);
  }

  componentWillMount() {
    const { device } = this.props;

    if (_.isEmpty(device)) {
      const errors = [];

      errors.push(new Error('No device provided'));
      this.setState({ errors });

      return;
    }

    const { errors } = this.validator.validate(device, validationSchema);

    if (!_.isEmpty(errors)) {
      this.setState({ errors });
      return;
    }

    const { schemas } = device;

    this.setState({
      schemas,
      selectedSchema: schemas.configure,
    });
  }

  handleSchemaSelection(selectedSchema) {
    const { schemas } = this.state;
    this.setState({
      selectedSchema: schemas[selectedSchema],
    });
  }

  renderErrorMessages(errors) {
    const errorItems = _.map(errors, (error, index) => {
      return <li key={ index }>{ error.message }</li>;
    });

    return <ul className="errors">{ errorItems }</ul>;
  }

  render() {
    const { errors, schemas, selectedSchema } = this.state;

    if (!_.isEmpty(errors)) return this.renderErrorMessages(errors);

    return (
      <div className="MeshbluDeviceEditor">
        <SchemaSelector
          schemas={_.keys(schemas)}
          selectedSchema={selectedSchema}
          onChange={this.handleSchemaSelection}
        />

        <div className="MeshbluDeviceEditor-schemaForm">
          <ReactSchemaForm
            schema={selectedSchema}
            formData={{}}
            onSubmit={null}
          />
        </div>
      </div>
    );
  }
}

MeshbluDeviceEditor.propTypes = propTypes;
