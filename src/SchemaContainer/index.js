import _ from 'lodash';
import React, { PropTypes } from 'react';
import JsonSchemaEditor from 'zooid-json-schema-editor';

const propTypes = {
  model: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  form: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  selectableDevices: PropTypes.array,
};

const defaultProps = {
  model: {},
  schema: {},
  onSubmit: _.noop,
}

const SchemaContainer = ({ model, form, schema, onSubmit }) => {
  if (!schema) {
    return <h3>Missing Schema</h3>
  }

  return (
    <div className="SchemaForm">
      <JsonSchemaEditor schema={schema} form={form} model={model} onSubmit={onSubmit} />
    </div>
  );
};

SchemaContainer.propTypes    = propTypes;
SchemaContainer.defaultProps = defaultProps;

export default SchemaContainer;
