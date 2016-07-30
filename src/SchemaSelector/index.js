import _ from 'lodash'
import React, { PropTypes } from 'react'
import Select from 'react-select-plus'

const propTypes = {
  schemas: PropTypes.object.isRequired,
  selected: PropTypes.string,
  onChange: PropTypes.func,
}

const defaultProps = {
  onChange: _.noop,
}

const SchemaSelector = ({ schemas, selected, onChange }) => {
  const keys = _.keys(schemas)
  if (_.size(keys) < 2) {
    return null
  }
  const groups = {
    '': {},
  }
  _.each(schemas, (schema, schemaKey) => {
    if (schema == null) {
      return
    }
    const groupName = schema['x-group-name'] || ''
    groups[groupName] = groups[groupName] || {}
    groups[groupName][schemaKey] = schema
  })
  let groupedOptions = []
  _.each(groups, (group, groupName) => {
    const options = _.map(group, (schema = {}, value = '') => {
      const label = schema.title || value
      return { label, value }
    })
    groupedOptions.push({ label: groupName, options })
  })

  function wrappedOnChange({ value } = {}) {
    if (value == selected) return
    onChange(value)
  }

  return (
    <div className="SchemaSelector--container">
      <Select
        className="SchemaSelector"
        dropdownClassName="form-control"
        optionClassName="SchemaSelector--option"
        options={groupedOptions}
        value={selected}
        clearable={false}
        onChange={wrappedOnChange}
      />
    </div>
  )
}

SchemaSelector.propTypes    = propTypes
SchemaSelector.defaultProps = defaultProps

export default SchemaSelector
