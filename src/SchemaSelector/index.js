import _ from 'lodash';
import React, { PropTypes } from 'react';
import Select from 'react-select-plus';
import 'react-select-plus/dist/react-select-plus.min.css';
import './index.css';

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
  let groups = {
    '': {}
  }
  _.each(schemas, (schema, schemaKey) => {
    if(schema == null) {
      return
    }
    const groupName = schema['x-group-name'] || ''
    groups[groupName] = groups[groupName] || {}
    groups[groupName][schemaKey] = schema
  })
  let groupedOptions = [];
  _.each(groups, (group, groupName) => {
    const options = _.map(group, (schema, value) => {
      const label = schema.title || value
      return { label, value: value }
    });
    groupedOptions.push({ label: groupName, options })
  });

  const wrappedOnChange = ({ value }) => {
    onChange(value)
  }

  return (
    <div className="SchemaSelector--container">
      <Select
        className="SchemaSelector"
        dropdownClassName="form-control"
        options={groupedOptions}
        value={selected}
        clearable={false}
        onChange={wrappedOnChange} />
    </div>
  );
};

SchemaSelector.propTypes    = propTypes;
SchemaSelector.defaultProps = defaultProps;

export default SchemaSelector;
