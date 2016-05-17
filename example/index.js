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

class Example extends Component {
  constructor(props) {
    super(props);

    this.handleConfig  = this.handleConfig.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }

  componentWillMount() {
    const device = ExampleDevice;
    this.setState({ device });
  }

  handleConfig(model) {
    console.log('Config', model);
    const newDevice = _.assign({}, this.state.device, model);
    this.setState({ device: newDevice })
  }

  handleMessage(message) {
    console.log('Message', message);
  }

  render() {
    const { device } = this.state;

    if (!device) return <h1>Loading</h1>;

    const { Tab, Tabs, TabList, TabPanel } = ReactTabs;

    return (
      <Tabs>
        <TabList>
          <Tab>Configuration Transmogrified</Tab>
          <Tab>Configuration</Tab>
          <Tab>Messaging Transmogrified</Tab>
          <Tab>Messaging</Tab>
        </TabList>

        <TabPanel>
          <DeviceConfigureSchemaContainer
            device={device}
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
          <MessageSchemaContainer
            schemas={device.schemas}
            onSubmit={this.handleMessage}
          />
        </TabPanel>

        <TabPanel>
          <DeviceMessageSchemaContainer
            device={device}
            onSubmit={this.handleMessage}
          />
        </TabPanel>
      </Tabs>
    );
  }
}

ReactDOM.render(<Example />, document.querySelector('#root'));
