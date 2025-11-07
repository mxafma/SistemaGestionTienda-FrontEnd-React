import React from 'react';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ 
  quantity, 
  onQuantityChange, 
  min = 1, 
  max = 99 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= min && value <= max) {
      onQuantityChange(value);
    }
  };

  return (
    <div className="mb-3">
      <label htmlFor="cantidad" className="form-label">Cantidad</label>
      <input 
        type="number" 
        id="cantidad" 
        className="form-control" 
        style={{ width: '100px' }}
        min={min} 
        max={max}
        value={quantity}
        onChange={handleChange}
      />
    </div>
  );
};

export default QuantitySelector;