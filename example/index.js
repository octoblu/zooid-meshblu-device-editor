import React, { Component } from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import ReactTabs from 'react-tabs';

import {
  DeviceConfigureSchemaContainer,
  ConfigureSchemaContainer,
  DeviceMessageSchemaContainer,
  MessageSchemaContainer,
} from '../src/index';

import ExampleDevice from '../test/fake-meshblu-device.json';
import OldDevice from '../test/fake-old-meshblu-device.json';

class Example extends Component {
  constructor(props) {
    super(props);

    this.handleConfig  = this.handleConfig.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }

  componentWillMount() {
    const device = ExampleDevice;
    const oldDevice = OldDevice;
    const emptySchemaDevice = {
      uuid: 'hello'
    }
    this.setState({ device, oldDevice, emptySchemaDevice });
  }

  handleConfig({ properties, selected }) {
    console.log('config', { properties, selected });
    const newDevice = _.assign({}, this.state.device, properties);
    this.setState({ device: newDevice })
  }

  handleMessage({ message, selected }) {
    console.log('message', { message, selected });
  }

  render() {
    const { device, oldDevice, emptySchemaDevice } = this.state;

    if (!device) return <h1>Loading</h1>;

    const { Tab, Tabs, TabList, TabPanel } = ReactTabs;

    return (
      <Tabs>
        <TabList>
          <Tab>Configuration Transmogrified</Tab>
          <Tab>Configuration</Tab>
          <Tab>Configuration Old Device</Tab>
          <Tab>Messaging Transmogrified</Tab>
          <Tab>Messaging</Tab>
          <Tab>Messaging Old Device</Tab>
        </TabList>

        <TabPanel>
          <DeviceConfigureSchemaContainer
            device={device}
            onSubmit={this.handleConfig}
          />
          <h1>Or when no schema is passed</h1>
          <DeviceConfigureSchemaContainer
            device={emptySchemaDevice}
            onSubmit={this.handleConfig}
          />
        </TabPanel>

        <TabPanel>
          <ConfigureSchemaContainer
            schemas={device.schemas}
            onSubmit={this.handleConfig}
          />
        </TabPanel>

        <TabPanel>
          <DeviceConfigureSchemaContainer
            device={oldDevice}
            onSubmit={this.handleConfig}
          />
        </TabPanel>

        <TabPanel>
          <DeviceMessageSchemaContainer
            device={device}
            onSubmit={this.handleMessage}
            selected="example-message-02"
          />
          <h1>Or when no schema is passed</h1>
          <DeviceMessageSchemaContainer
            device={emptySchemaDevice}
            onSubmit={this.handleConfig}
          />
        </TabPanel>

        <TabPanel>
          <MessageSchemaContainer
            schemas={device.schemas}
            onSubmit={this.handleMessage}
          />
        </TabPanel>

        <TabPanel>
          <DeviceMessageSchemaContainer
            device={oldDevice}
            onSubmit={this.handleConfig}
          />
        </TabPanel>

      </Tabs>
    );
  }
}

ReactDOM.render(<Example />, document.querySelector('#root'));
