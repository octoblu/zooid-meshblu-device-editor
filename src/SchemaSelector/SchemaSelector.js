import _ from 'lodash';
import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  schemaKeys: PropTypes.array.isRequired,
  selectedSchemaKey: PropTypes.string,
  onChange: PropTypes.func,
};

const defaultProps = {
  onChange: _.noop,
};

const SchemaSelector = ({ schemaKeys, selectedSchemaKey, onChange }) => {
  if (_.isEmpty(schemaKeys)) return null;

  const Buttons = _.map(schemaKeys, (schemaKey, index) => {
    const isSelected = (schemaKey === selectedSchemaKey);

    const classes = classNames(
      'SchemaSelector-button',
      { 'is-active': isSelected }
    );

    return (
      <button
        onClick={() => onChange(schemaKey)}
        key={index}
        className={classes}
      >
        {schemaKey}
      </button>
    );
  });

  return (
    <div className="SchemaSelector">
      {Buttons}
    </div>
  );
};

SchemaSelector.propTypes    = propTypes;
SchemaSelector.defaultProps = defaultProps;

export default SchemaSelector;
