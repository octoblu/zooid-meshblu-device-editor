import React, { PropTypes } from 'react';
import ReactSchemaForm from 'react-jsonschema-form';

const propTypes = {
  schema: PropTypes.object.isRequired,
};

const defaultProps = {
  schema: {},
};

const SchemaContainer = ({ schema }) => {
  return (
    <div className="SchemaForm--configuration">
      <ReactSchemaForm schema={schema}  />
    </div>
  );
};

SchemaContainer.propTypes    = propTypes;
SchemaContainer.defaultProps = defaultProps;

export default SchemaContainer;
