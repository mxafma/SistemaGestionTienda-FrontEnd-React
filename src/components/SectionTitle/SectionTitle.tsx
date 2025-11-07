import React from 'react';

interface SectionTitleProps {
  title: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, className = "brand mb-4" }) => {
  return <h2 className={className}>{title}</h2>;
};

export default SectionTitle;