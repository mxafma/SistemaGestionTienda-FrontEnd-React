import React from 'react';

interface FormTextareaProps {
  id: string;
  label: string;
  rows?: number;
  required?: boolean;
  placeholder?: string;
}

const FormTextarea: React.FC<FormTextareaProps> = ({ 
  id, 
  label, 
  rows = 5, 
  required = false,
  placeholder 
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <textarea 
        id={id} 
        className="form-control" 
        rows={rows} 
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormTextarea;