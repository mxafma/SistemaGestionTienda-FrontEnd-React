import React from 'react';

interface HeroDescriptionProps {
  description: string;
}

const HeroDescription: React.FC<HeroDescriptionProps> = ({ description }) => {
  return <p className="lead">{description}</p>;
};

export default HeroDescription;