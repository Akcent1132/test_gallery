import React from 'react';
import { useSelector } from 'react-redux';
import { errorsSelector } from '../store/selectors/errorSelector';
import '../styles/error.scss';

const ErrorAlert = () => {
  const errors = useSelector(errorsSelector);
  return (
    <div className="error">
      {!!errors.length &&
        errors.map((errMessage) => (
          <div key={errMessage} className="error__text">
            {errMessage}
          </div>
        ))}
    </div>
  );
};

export default ErrorAlert;
