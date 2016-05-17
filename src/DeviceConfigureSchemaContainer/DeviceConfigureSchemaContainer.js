import _ from 'lodash';
import React, { Component, PropTypes } from 'react';

import OctobluDeviceSchemaTransmogrifier from 'webpack-octoblu-device-schema-transmogrifier';
import ConfigureSchemaContainer from '../ConfigureSchemaContainer/ConfigureSchemaContainer';

const propTypes = {
  device: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selected: PropTypes.string,
};

const defaultProps = {
  onSubmit: _.noop,
};

class DeviceConfigureSchemaContainer extends Component {
  render() {
    const { device, onSubmit, selected } = this.props;
    const transmogrified = new OctobluDeviceSchemaTransmogrifier(device).transmogrify();
    return (
      <ConfigureSchemaContainer
        device={transmogrified}
        schemas={transmogrified.schemas}
        onSubmit={onSubmit}
        selected={selected}
        />
    );
  }
}

DeviceConfigureSchemaContainer.defaultProps = defaultProps;
DeviceConfigureSchemaContainer.propTypes = propTypes;

export default DeviceConfigureSchemaContainer;
