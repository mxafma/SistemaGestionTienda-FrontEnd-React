import React from 'react';

interface HeroTitleProps {
  title: string;
}

const HeroTitle: React.FC<HeroTitleProps> = ({ title }) => {
  return <h1 className="fw-bold brand">{title}</h1>;
};

export default HeroTitle;