import React, { Component, PropTypes } from 'react'
import ReactSchemaForm from 'react-jsonschema-form'

export default class MeshbluDeviceEditor extends Component {
  state = {
    device: null
  }

  static propTypes = {
    device: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }

  componentDidMount() {
  }

  handleOptionsChange = ({ formData }) => {
    const { onChange } = this.props
    onChange({options: formData})
  }

  handleNameChange = (event) => {
    const { onChange } = this.props
    const name = event.target.value
    onChange({name})
  }

  render() {
    const { error, loading }    = this.state
    const { device } = this.props

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>

    const { options, optionsSchema } = device

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
          <input type="text" name="name" value={device.name} onChange={this.handleNameChange} className="MeshbluDeviceEditor-name"/>
        </div>
      </div>
      {schemaEditor}
    </div>
  }
}
