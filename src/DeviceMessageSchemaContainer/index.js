import _ from 'lodash';
import React, { Component, PropTypes } from 'react';

import OctobluDeviceSchemaTransmogrifier from 'webpack-octoblu-device-schema-transmogrifier';
import MessageSchemaContainer from '../MessageSchemaContainer';

const propTypes = {
  device: PropTypes.object.isRequired,
  message: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  selected: PropTypes.string,
  selectableDevices: PropTypes.array,
};

const defaultProps = {
  onSubmit: _.noop,
};

class DeviceMessageSchemaContainer extends Component {
  render() {
    const { device, message, onSubmit, selected, selectableDevices } = this.props;
    const transmogrified = new OctobluDeviceSchemaTransmogrifier(device).transmogrify();
    if (_.isEmpty(_.get(transmogrified, 'schemas.message'))) {
      return <h3>Device does not contain a message schema.</h3>;
    }
    return (
      <MessageSchemaContainer
        message={message}
        schemas={transmogrified.schemas}
        selectableDevices={selectableDevices}
        onSubmit={onSubmit}
        selected={selected}
      />
    );
  }
}

DeviceMessageSchemaContainer.defaultProps = defaultProps;
DeviceMessageSchemaContainer.propTypes = propTypes;

export default DeviceMessageSchemaContainer;
