import _ from 'lodash'
import React, { Component, PropTypes } from 'react'

import SchemaContainer from '../SchemaContainer'
import SchemaSelector from '../SchemaSelector'

const propTypes = {
  message: PropTypes.object,
  selected: PropTypes.string,
  schemas: PropTypes.shape({
    message: PropTypes.object.isRequired,
  }),
  onSubmit: PropTypes.func.isRequired,
  selectableDevices: PropTypes.array,
}

const defaultProps = {
  message: {},
  schemas: {},
  onSubmit: _.noop,
}

class MessageSchemaContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { selected: null }
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount() {
    const { schemas, selected } = this.props
    if (selected) {
      this.setState({ selected })
      return
    }
    const firstSchemaKey = _.head(_.keys(schemas.message))
    this.setState({ selected: firstSchemaKey })
  }

  componentWillReceiveProps(newProps) {
    const { selected } = newProps
    if (selected) {
      this.setState({ selected })
    }
  }

  handleChange(selected) {
    this.setState({ selected })
  }

  render() {
    const { schemas, onSubmit, selectableDevices } = this.props
    const { selected } = this.state

    const schemaMessage = schemas.message
    let selectedSchema = {}

    if (selected && schemaMessage[selected]) {
      selectedSchema = schemaMessage[selected]
    }

    if (_.isEmpty(selectedSchema)) {
      selectedSchema = _.first(_.values(schemaMessage))
    }

    const wrappedOnSubmit = (message) => {
      onSubmit({ message, selected })
    }

    return (
      <div>
        <SchemaSelector schemas={schemaMessage} selectableDevices={selectableDevices} selected={selected} onChange={this.handleChange} />
        <SchemaContainer schema={selectedSchema} selectableDevices={selectableDevices} onSubmit={wrappedOnSubmit} />
      </div>
    )
  }
}

MessageSchemaContainer.defaultProps = defaultProps
MessageSchemaContainer.propTypes = propTypes

export default MessageSchemaContainer
