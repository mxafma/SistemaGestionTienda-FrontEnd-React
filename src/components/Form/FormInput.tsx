import React from 'react';

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({ 
  id, 
  label, 
  type = "text", 
  required = false,
  placeholder 
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <input 
        type={type} 
        id={id} 
        className="form-control" 
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;