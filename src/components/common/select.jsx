import React from 'react';

const Select = ({name, label, error, options, ...rest}) => {
  return (
    <div className="form-group">      
      <label htmlFor={name}>{label}</label>
      <select 
        {...rest}
        name={name}
        id={name}             
        className="form-control" 
      >
        <option key={name+'0'}  value={''}>Select option</option>
        {options.map((option, index) => <option key={name+index+1} value={option.value}>{option.text}</option>)}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}
 
export default Select;