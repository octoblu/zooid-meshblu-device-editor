import _ from 'lodash';
import React, { PropTypes } from 'react';
import ReactSchemaForm from 'react-jsonschema-form';

const propTypes = {
  device: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const defaultProps = {
  device: {},
  schema: {},
  onSubmit: _.noop,
};


const SchemaContainer = ({ device, schema, onSubmit }) => {
  const handleSubmit = (form) => {
    const { formData, idSchema } = form;
    const filteredFormData = _.pick(formData, _.keys(idSchema));
    onSubmit(filteredFormData);
  };
  return (
    <div className="SchemaForm--configuration">
      <ReactSchemaForm
        schema={schema}
        formData={device}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

SchemaContainer.propTypes    = propTypes;
SchemaContainer.defaultProps = defaultProps;

export default SchemaContainer;
