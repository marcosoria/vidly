import React from 'react';

const SearchBox = ({ value, onChange }) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1"><i className="fa fa-search"></i></span>
      </div>
      <input type="text" name="query" value={value} className="form-control" placeholder="Search movies" onChange={e => onChange(e.currentTarget.value)}  />
    </div>
  );
}
 
export default SearchBox;