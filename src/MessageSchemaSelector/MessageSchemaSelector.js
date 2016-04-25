import _ from 'lodash';
import React, { PropTypes } from 'react';

const propTypes = {
  messages: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};

const defaultProps = {
  onChange: _.noop,
};

const MessageSchemaSelector = ({ messages, onChange }) => {
  if (!messages) return null;
  if (!_.isArray(messages)) return null;

  const options = _.map(messages, (message, index) => {
    const { title } = message;
    return <option value={index} key={index}>{title}</option>;
  });

  return (
    <select
      className="MessageSchemaSelector"
      onChange={(e) => onChange(e.target.value)}
    >
      {options}
    </select>
  );
};

MessageSchemaSelector.propTypes    = propTypes;
MessageSchemaSelector.defaultProps = defaultProps;

export default MessageSchemaSelector;
