import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { Validator } from 'jsonschema';

import ErrorMessages from './ErrorMessages/ErrorMessages';
import SchemaSelector from './SchemaSelector/SchemaSelector';
import SchemaContainer from './SchemaContainer/SchemaContainer';
import MessageSchemaContainer from './MessageSchemaContainer/MessageSchemaContainer';

import validationSchema from './validation-schema.json';

const propTypes = {
  device: PropTypes.object.isRequired,
  onConfig: PropTypes.func.isRequired,
  onMessage: PropTypes.func.isRequired,
};

const defaultProps = {
  onConfig: _.noop,
  onMessage: _.noop,
};


export default class MeshbluDeviceEditor extends Component {
  constructor(props) {
    super(props);

    this.state =  {
      errors: null,
      schemas: null,
      selectedSchemaKey: null,
      selectedSchema: null,
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

  handleSchemaSelection(selectedSchemaKey) {
    const { schemas } = this.state;

    this.setState({
      selectedSchemaKey,
      selectedSchema: schemas[selectedSchemaKey],
    });
  }

  renderSchemaContainer() {
    const { onConfig, onMessage }               = this.props;
    const { selectedSchema, selectedSchemaKey } = this.state;

    if (selectedSchemaKey === 'messages') {
      return <MessageSchemaContainer messages={selectedSchema} onSubmit={onMessage} />;
    }

    return <SchemaContainer schema={selectedSchema} onSubmit={onConfig} />;
  }

  render() {
    const { errors } = this.state;

    if (!_.isEmpty(errors)) return <ErrorMessages errors={errors} />;

    return (
      <div className="MeshbluDeviceEditor">
        <SchemaSelector
          schemaKeys={['configure', 'messages']}
          selectedSchemaKey={'configure'}
          onChange={this.handleSchemaSelection}
        />

        {this.renderSchemaContainer()}
      </div>
    );
  }
}

MeshbluDeviceEditor.propTypes    = propTypes;
MeshbluDeviceEditor.defaultProps = defaultProps;
