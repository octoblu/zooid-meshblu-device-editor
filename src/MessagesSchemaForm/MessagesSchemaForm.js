import _ from 'lodash';
import React, { Component, PropTypes } from 'react';

import SchemaSelector from './SchemaSelector/SchemaSelector';

const propTypes = {
  device: PropTypes.object.isRequired,
};

export default class MessagesSchemaForm extends Component {
  constructor(props) {
    super(props);

    this.state =  {
      selectedSchemaKey: null,
      selectedSchema: null,
    };

    this.handleSchemaSelection = this.handleSchemaSelection.bind(this);
  }

  render() {
    return <div />;
  }
}

MessagesSchemaForm.propTypes = propTypes;
