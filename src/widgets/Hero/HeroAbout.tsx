import React from 'react';
import HeroTitle from './HeroTitle';
import HeroDescription from './HeroDescription';

interface HeroAboutProps {
  title: string;
  description: string;
  backgroundImage?: string;
}

const HeroAbout: React.FC<HeroAboutProps> = ({ 
  title, 
  description, 
  backgroundImage
}) => {
  const headerStyle = backgroundImage ? {
    backgroundImage: `url("${backgroundImage}")`
  } : {};

  return (
    <header className="header-nosotros" style={headerStyle}>
      <div className="container">
        <HeroTitle title={title} />
        <HeroDescription description={description} />
      </div>
    </header>
  );
};

export default HeroAbout;