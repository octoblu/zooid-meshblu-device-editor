import _ from 'lodash';
import React, { Component, PropTypes } from 'react';

import OctobluDeviceSchemaTransmogrifier from 'webpack-octoblu-device-schema-transmogrifier';
import MessageSchemaContainer from '../MessageSchemaContainer/MessageSchemaContainer';

const propTypes = {
  device: PropTypes.object.isRequired,
  message: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

const defaultProps = {
  onSubmit: _.noop,
};

class DeviceMessageSchemaContainer extends Component {
  render() {
    const { device, message, onSubmit } = this.props;
    const transmogrified = new OctobluDeviceSchemaTransmogrifier(device).transmogrify();
    return (
      <MessageSchemaContainer message={message} schemas={transmogrified} onSubmit={onSubmit} />
    );
  }
}

DeviceMessageSchemaContainer.defaultProps = defaultProps;
DeviceMessageSchemaContainer.propTypes = propTypes;

export default DeviceMessageSchemaContainer;
