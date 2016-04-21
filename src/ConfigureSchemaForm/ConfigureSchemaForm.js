import React, { PropTypes } from 'react';
import ReactSchemaForm from 'react-jsonschema-form';

const propTypes = {
  schema: PropTypes.object.isRequired,
};

const defaultProps = {
  schema: {},
};

const ConfigureSchemaForm = ({ schema }) => {
  return (
    <div className="SchemaForm--configuration">
      <ReactSchemaForm schema={schema} />
    </div>
  );
};

ConfigureSchemaForm.propTypes    = propTypes;
ConfigureSchemaForm.defaultProps = defaultProps;

export default ConfigureSchemaForm;
