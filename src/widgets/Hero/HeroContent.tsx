import React from 'react';
import HeroText from './HeroText';
import HeroImage from './HeroImage';

interface HeroContentProps {
  title: string;
  description: string;
  image: string;
}

const HeroContent: React.FC<HeroContentProps> = ({ title, description, image }) => {
  return (
    <div className="container d-flex flex-column flex-md-row align-items-center gap-5">
      <HeroText title={title} description={description} />
      <div className="col-md-6 text-center">
        <HeroImage image={image} />
      </div>
    </div>
  );
};

export default HeroContent;