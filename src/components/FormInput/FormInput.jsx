import React from "react";

const FormInput =  ({ htmlForId, label, type, value, onChange, errors }) => {
  return (
    <div className="form-group">
      <label htmlFor={htmlForId}>{label}</label>
      <input
        onChange={onChange}
        value={value}
        type={type}
        className="form-control"
        id={htmlForId}
        name={htmlForId}
      />
      {/* {errors[htmlForId] !== undefined ? (
        <div className="alert alert-danger" role="alert">
          {errors[htmlForId]}
        </div>
      ) : null} */}
    </div>
  );
};

export default FormInput;