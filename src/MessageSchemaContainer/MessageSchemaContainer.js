import _ from 'lodash';
import React, { Component, PropTypes } from 'react';

import SchemaContainer from '../SchemaContainer/SchemaContainer';
import SchemaSelector from '../SchemaSelector/SchemaSelector';

const propTypes = {
  message: PropTypes.object,
  schemas: PropTypes.shape({
    message: PropTypes.object.isRequired,
  }),
  onSubmit: PropTypes.func.isRequired,
};

const defaultProps = {
  message: {},
  schemas: {},
  onSubmit: _.noop,
};

class MessageSchemaContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: null };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const { schemas } = this.props;
    this.setState({ selected: _.first(_.keys(schemas.message)) });
  }

  handleChange(selected) {
    this.setState({ selected });
  }

  render() {
    const { message, schemas, onSubmit } = this.props;
    const { selected } = this.state;

    const schemaMessage = schemas.message;
    let selectedSchema = {};

    if(selected && schemaMessage[selected]) {
      selectedSchema = schemaMessage[selected];
    }

    return (
      <div>
        <SchemaSelector schemas={schemaMessage} selected={selected} onChange={this.handleChange} />
        <SchemaContainer schema={selectedSchema} onSubmit={onSubmit} />
      </div>
    );
  }
}

MessageSchemaContainer.defaultProps = defaultProps;
MessageSchemaContainer.propTypes = propTypes;

export default MessageSchemaContainer;
