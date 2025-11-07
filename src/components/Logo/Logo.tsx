import React from 'react';

interface LogoProps {
  src?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large';
  hasBorder?: boolean;
  borderColor?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  src = "/src/shared/assets/logo0.png", 
  alt = "Foodix Logo",
  size = 'medium',
  hasBorder = true,
  borderColor = 'border-foodix'
}) => {
  const sizeMap = {
    small: '40',
    medium: '80',
    large: '120'
  };

  const borderClass = hasBorder ? `border border-2 ${borderColor} rounded-pill` : '';

  return (
    <img 
      src={src} 
      alt={alt} 
      height={sizeMap[size]} 
      className={`mb-3 ${borderClass}`}
    />
  );
};

export default Logo;