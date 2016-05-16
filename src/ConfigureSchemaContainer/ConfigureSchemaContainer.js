import _ from 'lodash';
import React, { Component, PropTypes } from 'react';

import SchemaContainer from '../SchemaContainer/SchemaContainer';
import SchemaSelector from '../SchemaSelector/SchemaSelector';

const propTypes = {
  device: PropTypes.object,
  schemas: PropTypes.shape({
    configure: PropTypes.object.isRequired,
  }),
  onSubmit: PropTypes.func.isRequired,
};

const defaultProps = {
  device: {},
  schemas: {},
  onSubmit: _.noop,
};

class ConfigureSchemaContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: null };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const { schemas } = this.props;
    this.setState({ selected: _.first(_.keys(schemas.configure)) });
  }

  handleChange(selected) {
    this.setState({ selected });
  }

  render() {
    const { device, schemas, onSubmit } = this.props;
    const { selected } = this.state;

    const schemaConfigure = schemas.configure;
    let selectedSchema = {};

    if(selected && schemaConfigure[selected]) {
      selectedSchema = schemaConfigure[selected];
    }

    return (
      <div>
        <SchemaSelector schemas={schemaConfigure} selected={selected} onChange={this.handleChange} />
        <SchemaContainer schema={selectedSchema} model={device} onSubmit={onSubmit} />
      </div>
    );
  }
}

ConfigureSchemaContainer.defaultProps = defaultProps;
ConfigureSchemaContainer.propTypes = propTypes;

export default ConfigureSchemaContainer;
