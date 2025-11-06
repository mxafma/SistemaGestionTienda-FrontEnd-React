import React from 'react';
import HeroTitle from './HeroTitle';
import HeroDescription from './HeroDescription';

interface HeroTextProps {
  title: string;
  description: string;
}

const HeroText: React.FC<HeroTextProps> = ({ title, description }) => {
  return (
    <div className="col-md-6">
      <HeroTitle title={title} />
      <HeroDescription description={description} />
    </div>
  );
};

export default HeroText;