
import React from 'react';
import PropTypes from 'prop-types'
import classnames from 'classnames';
import { Input } from 'reactstrap'


const TextFieldGroup = ({ field, value, label, error, type, onChange, checkUserExists }) => {
  return (
    <div className={classnames('form-group', { 'has-error': error })}>
      <Input
        onChange={onChange}
        onBlur={checkUserExists}
        value={value}
        type={type}
        name={field}
        className="form-control"
        placeholder={type}
      />
    {error && <span className="help-block">{error}</span>}
    </div>
  );
}

TextFieldGroup.propTypes = {
  field: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checkUserExists: PropTypes.func
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup;
