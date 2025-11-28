import React from 'react';

interface FormButtonProps {
  type?: 'button' | 'submit' | 'reset';
  text: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const FormButton: React.FC<FormButtonProps> = ({ 
  type = 'submit', 
  text, 
  className = 'btn btn-foodix',
  onClick 
  , disabled = false
}) => {
  return (
    <div className="d-grid">
      <button type={type} className={className} onClick={onClick} disabled={disabled}>
        {text}
      </button>
    </div>
  );
};

export default FormButton;