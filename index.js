import React, { Component, PropTypes } from 'react'
import ReactSchemaForm from 'react-jsonschema-form'
import _ from 'lodash'

import SchemaSelector from './SchemaSelector'

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
      schemas: this.props.device.meshblu.schemas.configure
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

  renderSelect() {

  }
  render() {
    const { error, loading, name, options, schemas}    = this.state
    const titles = _.map(schemas, 'title')
    const defaultOption = _.head(titles)

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>

    let schemaEditor = <span></span>
    if(schemas) {
      schemaEditor = <ReactSchemaForm
        schema={schemas}
        formData={options}
        onSubmit={this.handleOptionsChange}
      />
    }

    return <div>
      <SchemaSelector
        titles={titles}
        selectedTitle={defaultOption}
        onChange={this._onSelect}
      />

      <div className="MeshbluDeviceEditor-form">
        <label htmlFor="name" className="MeshbluDeviceEditor-label">Name:</label>
        <div className="MeshbluDeviceEditor-section">
          <input type="text" name="name" value={name} onChange={this.handleNameChange} className="MeshbluDeviceEditor-name"/>
        </div>
      </div>
      {schemaEditor}
    </div>
  }
}
