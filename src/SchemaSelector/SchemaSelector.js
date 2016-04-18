import _ from 'lodash'
import React, { Component, PropTypes } from 'react'

const propTypes = {
  titles: PropTypes.array.isRequired,
  selectedTitle: PropTypes.string,
  onChange: PropTypes.func
}

const defaultProps = {
  onChange: _.noop
}

const SchemaSelector = ({titles, selectedTitle, onChange}) => {
  if (!titles) return null

  selectedTitle = selectedTitle || _.head(titles)

  const options = _.map(titles, (title, index) => {
    return <option value={title} key={index}>{title}</option>
  })

  return (
    <select
      defaultValue={selectedTitle}
      className="SchemaSelector"
      onChange={onChange}
    >
      {options}
    </select>
  )
}

SchemaSelector.propTypes    = propTypes
SchemaSelector.defaultProps = defaultProps

export default SchemaSelector
