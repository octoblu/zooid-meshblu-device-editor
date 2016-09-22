import _ from 'lodash'
import React, { PropTypes } from 'react'
import ReactSchemaForm from 'react-jsonschema-form'
import MeshbluDevicePicker from 'zooid-meshblu-device-picker'
import TextWidget from 'react-jsonschema-form/lib/components/widgets/TextWidget'

const propTypes = {
  model: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selectableDevices: PropTypes.array,
}

const defaultProps = {
  model: {},
  schema: {},
  onSubmit: _.noop,
}

function isSchemaEmpty(_schema) {
  const schema = _.clone(_schema)
  delete schema['x-form-schema']
  return _.isEmpty(schema)
}

const SchemaContainer = ({ model, schema, onSubmit, selectableDevices }) => {
  const handleSubmit = (form) => {
    const { formData, idSchema } = form
    const filteredFormData = _.pick(formData, _.keys(idSchema))
    onSubmit(filteredFormData)
  }

  if (isSchemaEmpty(schema)) {
    return null
  }

  const MeshbluDeviceWidget = ({ onChange, schema, id, value, required }) => {
    let mySelectableDevices = _.clone(selectableDevices)
    if (schema['x-meshblu-device-filter']) {
      mySelectableDevices = _.filter(mySelectableDevices, schema['x-meshblu-device-filter'])
    }

    const selectDevice = (device) => {
      onChange(device.uuid)
    }

    if (_.isEmpty(mySelectableDevices)) {
      return <TextWidget id={id} value={value} required={required} onChange={onChange} schema={schema} />
    }

    return (
      <MeshbluDevicePicker
        devices={mySelectableDevices}
        onSelection={selectDevice}
      />
    )
  }

  const widgets = {
    'meshblu-device': MeshbluDeviceWidget,
  }

  return (
    <div className="SchemaForm">
      <ReactSchemaForm
        schema={schema}
        formData={model}
        onSubmit={handleSubmit}
        widgets={widgets}
      />
    </div>
  )
}

SchemaContainer.propTypes    = propTypes
SchemaContainer.defaultProps = defaultProps

export default SchemaContainer
