import _ from 'lodash';
import React, { Component, PropTypes } from 'react';

import SchemaContainer from '../SchemaContainer/SchemaContainer';
import MessageSchemaSelector from '../MessageSchemaSelector/MessageSchemaSelector';

const propTypes = {
  messages: PropTypes.array.isRequired,
};

export default class MessageSchemaContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMessageSchema: null,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const { messages } = this.props;
    this.setState({ selectedMessageSchema: _.head(messages) });
  }

  handleChange(messageIndex) {
    this.setState({
      selectedMessageSchema: this.props.messages[messageIndex],
    });
  }

  render() {
    const { selectedMessageSchema } = this.state;

    return (
      <div>
        <MessageSchemaSelector messages={this.props.messages} onChange={this.handleChange} />
        <SchemaContainer schema={selectedMessageSchema} />
      </div>
    );
  }
}

MessageSchemaContainer.propTypes = propTypes;
