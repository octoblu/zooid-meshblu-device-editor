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

const SchemaSelector = ({ schemas, selectedSchema, onChange }) => {
  if (!schemas) return null;

  const options = _.map(schemas, (title, index) => {
    return <option value={title} key={index}>{title}</option>;
  });

  return (
    <select
      defaultValue={selectedSchema}
      className="SchemaSelector"
      onChange={(e) => onChange(e.target.value)}
    >
      {options}
    </select>
  );
};

SchemaSelector.propTypes    = propTypes;
SchemaSelector.defaultProps = defaultProps;

export default SchemaSelector;
