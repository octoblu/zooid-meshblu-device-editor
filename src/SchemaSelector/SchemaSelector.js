import _ from 'lodash';
import React, { PropTypes } from 'react';

const propTypes = {
  schemas: PropTypes.object.isRequired,
  selected: PropTypes.string,
  onChange: PropTypes.func,
};

const defaultProps = {
  onChange: _.noop,
};

const SchemaSelector = ({ schemas, selected, onChange }) => {
  const keys = _.keys(schemas)
  if(_.size(keys) < 2) {
    return null
  }
  const options = _.map(schemas, (schema, schemaKey) => {
    let { title } = schema;
    if(!title) {
      title = schemaKey;
    }
    return <option value={schemaKey} key={schemaKey}>{title}</option>;
  });

  return (
    <select
      className="SchemaSelector form-control"
      value={selected}
      onChange={(e) => onChange(e.target.value)}>
      {options}
    </select>
  );
};

SchemaSelector.propTypes    = propTypes;
SchemaSelector.defaultProps = defaultProps;

export default SchemaSelector;
