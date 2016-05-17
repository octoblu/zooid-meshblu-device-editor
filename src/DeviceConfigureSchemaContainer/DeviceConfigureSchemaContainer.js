import _ from 'lodash';
import React, { Component, PropTypes } from 'react';

import OctobluDeviceSchemaTransmogrifier from 'webpack-octoblu-device-schema-transmogrifier';
import ConfigureSchemaContainer from '../ConfigureSchemaContainer/ConfigureSchemaContainer';

const propTypes = {
  device: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const defaultProps = {
  onSubmit: _.noop,
};

class DeviceConfigureSchemaContainer extends Component {
  render() {
    const { device, onSubmit } = this.props;
    const transmogrified = new OctobluDeviceSchemaTransmogrifier(device).transmogrify();
    return (
      <ConfigureSchemaContainer device={transmogrified} schemas={transmogrified.schemas} onSubmit={onSubmit} />
    );
  }
}

DeviceConfigureSchemaContainer.defaultProps = defaultProps;
DeviceConfigureSchemaContainer.propTypes = propTypes;

export default DeviceConfigureSchemaContainer;
