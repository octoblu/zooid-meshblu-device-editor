import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import ReactSchemaForm from 'react-jsonschema-form'

import SchemaSelector from './components/SchemaSelector/SchemaSelector'

export default class MeshbluDeviceEditor extends Component {
  state = {
    name: '',
    options: {},
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
    const { configure } = this.props.device.meshblu.schemas
    const titles = _.map(configure, 'title')
    const selectedSchema = _.head(configure)

    this.setState({
      name: name,
      options: options,
      optionsSchema: optionsSchema,
      titles: titles,
      configure: configure,
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

    const { configure } = this.state // anti-pattern (line 24)?
    const selectedSchema = _.find(configure, { title: value})

    this.setState({
      selectedSchema: selectedSchema
    })
    console.log(this.state.selectedSchema)
  }

  render() {
    const { error, loading, name, options, optionsSchema, titles } = this.state
    if (loading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>

    let schemaEditor = <span></span>
    if(this.state.selectedSchema) {
      schemaEditor = <ReactSchemaForm
        schema={this.state.selectedSchema}
        formData={options}
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
        selectedTitle="hello"
        onChange={this.handleSchemaSelection}
      />
      
      {schemaEditor}
    </div>
  }
}
