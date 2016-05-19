import _ from 'lodash';
import React, { Component, PropTypes } from 'react';

import SchemaContainer from '../SchemaContainer';
import SchemaSelector from '../SchemaSelector';

const propTypes = {
  device: PropTypes.object,
  selected: PropTypes.string,
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
    const { schemas, selected } = this.props;
    if(selected) {
      this.setState({ selected });
      return
    }
    const firstSchemaKey = _.head(_.keys(schemas.configure))
    this.setState({ selected: firstSchemaKey })
  }

  componentWillReceiveProps(newProps) {
    const { selected } = newProps
    if(selected) {
      this.setState({ selected });
    }
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

    const wrappedOnSubmit = (properties) => {
      onSubmit({ properties, selected })
    }

    return (
      <div>
        <SchemaSelector schemas={schemaConfigure} selected={selected} onChange={this.handleChange} />
        <SchemaContainer schema={selectedSchema} model={device} onSubmit={wrappedOnSubmit} />
      </div>
    );
  }
}

ConfigureSchemaContainer.defaultProps = defaultProps;
ConfigureSchemaContainer.propTypes = propTypes;

export default ConfigureSchemaContainer;
