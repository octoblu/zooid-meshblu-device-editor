import React, { PropTypes } from 'react';
import ReactSchemaForm from 'react-jsonschema-form';

const propTypes = {
  schema: PropTypes.object.isRequired,
};

const ConfigureSchemaForm = ({ schema }) => {
  return (
    <div className="ConfigureSchemaForm">
      <ReactSchemaForm schema={schema} />
    </div>
  );
};

ConfigureSchemaForm.propTypes = propTypes;

export default ConfigureSchemaForm;
