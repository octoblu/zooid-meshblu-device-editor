import _ from 'lodash';
import React, { PropTypes } from 'react';
import ReactSchemaForm from 'react-jsonschema-form';
import MeshbluDevicePicker from 'zooid-meshblu-device-picker'
import TextWidget from 'react-jsonschema-form/lib/components/widgets/TextWidget'

const propTypes = {
  model: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selectableDevices: PropTypes.array,
};

const defaultProps = {
  model: {},
  schema: {},
  onSubmit: _.noop,
}

const SchemaContainer = ({ model, schema, onSubmit, selectableDevices }) => {
  const handleSubmit = (form) => {
    const { formData, idSchema } = form;
    const filteredFormData = _.pick(formData, _.keys(idSchema));
    onSubmit(filteredFormData);
  };

  if (!schema) {
    return <h3>Missing Schema</h3>
  }

  const MeshbluDeviceWidget = ({id, value, required, onChange, schema}) => {

    if(schema['x-meshblu-device-filter']) {
      selectableDevices = _.filter(selectableDevices, schema['x-meshblu-device-filter'])
    }

    const selectDevice = (device) => {
      onChange(device.uuid)
    }

     // if( _.isEmpty(selectableDevices) ) {
    //   return <TextWidget id={id} value={value} required={required} onChange={onChange} schema={schema} />
    // }

    return (
      <MeshbluDevicePicker
        devices={selectableDevices}
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
  );
};

SchemaContainer.propTypes    = propTypes;
SchemaContainer.defaultProps = defaultProps;

export default SchemaContainer;
