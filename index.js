import React, { Component, PropTypes } from 'react'
import ReactSchemaForm from 'react-jsonschema-form'

export default class MeshbluDeviceEditor extends Component {

  state = {
    name: '',
    options: {},
    optionsSchema: { type: 'object'}
  }

  static propTypes = {
    device: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.setState({
      name: this.props.device.name,
      options: this.props.device.options,
      optionsSchema: this.props.device.optionsSchema
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

  render() {
    const { error, loading, name, options, optionsSchema }    = this.state

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>

    let schemaEditor = <span></span>
    if(optionsSchema) {
      schemaEditor = <ReactSchemaForm
        schema={optionsSchema}
        formData={options}
        onSubmit={this.handleOptionsChange}
      />
    }

    return <div>
      <div className="MeshbluDeviceEditor-form">
        <label for="name" className="MeshbluDeviceEditor-label">Name:</label>
        <div className="MeshbluDeviceEditor-section">
          <input type="text" name="name" value={name} onChange={this.handleNameChange} className="MeshbluDeviceEditor-name"/>
        </div>
      </div>
      {schemaEditor}
    </div>
  }
}
