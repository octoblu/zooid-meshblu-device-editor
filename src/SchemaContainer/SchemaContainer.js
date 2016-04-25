import _ from 'lodash';
import React, { PropTypes } from 'react';
import ReactSchemaForm from 'react-jsonschema-form';

const propTypes = {
  schema: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const defaultProps = {
  schema: {},
  onSubmit: _.noop,
};


const SchemaContainer = ({ schema, onSubmit }) => {
  const handleSubmit = (form) => {
    const { formData, idSchema } = form;
    const filteredFormData = _.pick(formData, _.keys(idSchema));
    onSubmit(filteredFormData);
  };

  return (
    <div className="SchemaForm--configuration">
      <ReactSchemaForm
        schema={schema}
        formData={null}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

SchemaContainer.propTypes    = propTypes;
SchemaContainer.defaultProps = defaultProps;

export default SchemaContainer;
