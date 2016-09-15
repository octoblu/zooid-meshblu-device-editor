import _ from 'lodash'
import React, { Component, PropTypes } from 'react'

import SchemaContainer from '../SchemaContainer'
import SchemaSelector from '../SchemaSelector'

const propTypes = {
  device: PropTypes.object,
  selected: PropTypes.string,
  schemas: PropTypes.shape({
    configure: PropTypes.object.isRequired,
  }),
  onSubmit: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  selectableDevices: PropTypes.array,
}

const defaultProps = {
  device: {},
  schemas: {},
  onSubmit: _.noop,
  onSelect: _.noop
}

class ConfigureSchemaContainer extends Component {

  componentWillMount() {
    const { schemas, selected } = this.props
  }

  handleChange = (selected) => {
    const { onSelect } = this.props
    onSelect({ selected })
  }

  render() {
    const { device, selectableDevices, schemas, onSubmit, selected } = this.props
    const schemaConfigure = schemas.configure
    let selectedSchema = {}

    if (selected && schemaConfigure[selected]) {
      selectedSchema = schemaConfigure[selected]
    }

    if(_.isEmpty(selectedSchema)){
      selectedSchema = _.first(_.values(schemaConfigure))
    }

    const wrappedOnSubmit = (properties) => {
      onSubmit({ properties, selected })
    }

    return (
      <div>
        <SchemaSelector
          schemas={schemaConfigure}
          selected={selected}
          selectableDevices={selectableDevices}
          onChange={this.handleChange}
        />
        <SchemaContainer
          schema={selectedSchema}
          model={device}
          selectableDevices={selectableDevices}
          onSubmit={wrappedOnSubmit}
        />
      </div>
    )
  }
}

ConfigureSchemaContainer.defaultProps = defaultProps
ConfigureSchemaContainer.propTypes = propTypes

export default ConfigureSchemaContainer
