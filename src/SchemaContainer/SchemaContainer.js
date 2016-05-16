import _ from 'lodash';
import React, { PropTypes } from 'react';
import ReactSchemaForm from 'react-jsonschema-form';

const propTypes = {
  model: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const defaultProps = {
  model: {},
  schema: {},
  onSubmit: _.noop,
};

const SchemaContainer = ({ model, schema, onSubmit }) => {
  const handleSubmit = (form) => {
    const { formData, idSchema } = form;
    const filteredFormData = _.pick(formData, _.keys(idSchema));
    onSubmit(filteredFormData);
  };
  return (
    <div className="SchemaForm">
      <ReactSchemaForm
        schema={schema}
        formData={model}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

SchemaContainer.propTypes    = propTypes;
SchemaContainer.defaultProps = defaultProps;

export default SchemaContainer;
