import _ from 'lodash';
import React, { PropTypes } from 'react';

const propTypes = {
  errors: PropTypes.array,
};

const ErrorMessages = ({ errors }) => {
  if (_.isEmpty(errors)) return null;

  const errorItems = _.map(errors, (error, index) => {
    return <div key={index} className="ErroMessages-item">{error.message}</div>;
  });

  return (
    <div className="ErrorMessages">
      {errorItems}
    </div>
  );
};

ErrorMessages.propTypes = propTypes;

export default ErrorMessages;
