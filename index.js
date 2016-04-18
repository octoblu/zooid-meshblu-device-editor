import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import ReactSchemaForm from 'react-jsonschema-form'

import SchemaSelector from './src/SchemaSelector/SchemaSelector'

export default class MeshbluDeviceEditor extends Component {
  state = {
    name: '',
    options: {},
    messageForm: {},
    optionsSchema: { type: 'object'},
    schemas: [],
    selectedSchema: {}
  }

  static propTypes = {
    device: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }

  componentDidMount() {
    console.log('mounted device', this.props.device)
    const { name, options, optionsSchema } = this.props.device
    const { message } = this.props.device.schemas
    const titles = _.map(message, 'title')
    const selectedSchema = _.head(message)

    this.setState({
      name: name,
      options: options,
      messageForm: {},
      optionsSchema: optionsSchema,
      titles: titles,
      message: message,
      selectedSchema: selectedSchema
    })
  }

  handleOptionsChange = ({ formData }) => {
    const { onChange } = this.props
    onChange({options: formData, name: this.state.name})
  }

  handleNameChange = (event) => {
    const name = event.target.value
    this.setState({name})
  }

  handleSchemaSelection = (event) => {
    const { value } = event.target
    const { message } = this.state // anti-pattern (line 24)?
    const selectedSchema = _.find(message, { title: value})

    this.setState({
      selectedSchema: selectedSchema
    })
    console.log(this.state.selectedSchema)
  }

  render() {
    const { error, loading, name, options, optionsSchema, titles, messageForm } = this.state
    if (loading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>

    let schemaEditor = <span></span>
    if(this.state.selectedSchema) {
      schemaEditor = <ReactSchemaForm
        schema={this.state.selectedSchema}
        formData={messageForm}
        onSubmit={this.handleOptionsChange}
      />
    }

    if(optionsSchema) {
      schemaEditor = <ReactSchemaForm
        schema={optionsSchema}
        formData={options}
        onSubmit={this.handleOptionsChange}
      />
    }

    return <div>
      <div className="MeshbluDeviceEditor-form">
        <label htmlFor="name" className="MeshbluDeviceEditor-label">Name:</label>
        <div className="MeshbluDeviceEditor-section">
          <input type="text" name="name" value={name} onChange={this.handleNameChange} className="MeshbluDeviceEditor-name"/>
        </div>
      </div>

      <SchemaSelector
        titles={titles}
        onChange={this.handleSchemaSelection}
      />

      {schemaEditor}
    </div>
  }
}
