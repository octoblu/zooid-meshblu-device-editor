import _ from 'lodash'
import React, { Component, PropTypes } from 'react'

const propTypes = {
  titles: PropTypes.array.isRequired,
  selectedTitle: PropTypes.string,
  onChange: PropTypes.function
}

const SchemaSelector = ({titles, selectedTitle, onChange}) => {
  const options = _.map(titles, (title, index) => {
    return <option value={title} key={index}>{title}</option>
  })

  return (
    <select defaultValue={selectedTitle} onChange={onChange}>
      {options}
    </select>
  )
}

export default SchemaSelector
