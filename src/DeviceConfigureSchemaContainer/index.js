import _ from 'lodash'
import React, { Component, PropTypes } from 'react'

import OctobluDeviceSchemaTransmogrifier from 'webpack-octoblu-device-schema-transmogrifier'
import ConfigureSchemaContainer from '../ConfigureSchemaContainer'

const propTypes = {
  device: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  selected: PropTypes.string,
  selectableDevices: PropTypes.array,
}

const defaultProps = {
  onSubmit: _.noop,
  onSelect: _.noop
}

class DeviceConfigureSchemaContainer extends Component {
  render() {
    const { device, onSubmit, onSelect, selected, selectableDevices } = this.props
    const transmogrified = new OctobluDeviceSchemaTransmogrifier(device).transmogrify()

    if (_.isEmpty(_.get(transmogrified, 'schemas.configure'))) {
      return <h3>Device does not contain a configure schema.</h3>
    }

    return (
      <ConfigureSchemaContainer
        device={transmogrified}
        schemas={transmogrified.schemas}
        selectableDevices={selectableDevices}
        onSubmit={onSubmit}
        onSelect={onSelect}
        selected={selected}
      />
    )
  }
}

DeviceConfigureSchemaContainer.defaultProps = defaultProps
DeviceConfigureSchemaContainer.propTypes = propTypes

export default DeviceConfigureSchemaContainer
