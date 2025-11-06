import React from 'react';
import HeroContent from './HeroContent';

interface HeroProps {
  title: string;
  description: string;
  image: string;
}

const Hero: React.FC<HeroProps> = ({ title, description, image }) => {
  return (
    <section className="bg-light py-5">
      <HeroContent title={title} description={description} image={image} />
    </section>
  );
};

export default Hero;