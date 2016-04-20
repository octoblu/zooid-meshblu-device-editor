import _ from 'lodash';
import React, { PropTypes } from 'react';

const propTypes = {
  schemas: PropTypes.array.isRequired,
  selectedSchema: PropTypes.string,
  onChange: PropTypes.func,
};

const defaultProps = {
  onChange: _.noop,
};

const MessageSchemaSelector = ({ schemas, selectedSchema, onChange }) => {
  if (!schemas) return null;

  const options = _.map(schemas, (title, index) => {
    return <option value={title} key={index}>{title}</option>;
  });

  return (
    <select
      defaultValue={selectedSchema}
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
