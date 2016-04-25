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
  return (
    <div className="SchemaForm--configuration">
      <ReactSchemaForm
        schema={schema}
        formData={null}
        onSubmit={({ formData }) => onSubmit(formData)}
      />
    </div>
  );
};

SchemaContainer.propTypes    = propTypes;
SchemaContainer.defaultProps = defaultProps;

export default SchemaContainer;
