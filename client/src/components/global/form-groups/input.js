// Packages
import React from 'react';
import PropTypes from 'prop-types'
import { FormGroup, Input, Label } from 'reactstrap';

const InputGeneral = ({ name, placeholder, field, value, label, error, type, onChange = () => {}, checkUserExists }) => {
  return (
    <FormGroup>
      {label && <Label for={name}>{label}:</Label>}
      <Input
        type={type}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        onBlur={checkUserExists}
        bsSize="sm"
      />
      {error && <small>{error}</small>}
    </FormGroup>
  )
}

InputGeneral.propTypes = {
  field: PropTypes.string,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  checkUserExists: PropTypes.func
}

InputGeneral.defaultProps = {
  type: 'text'
}

export default InputGeneral;
