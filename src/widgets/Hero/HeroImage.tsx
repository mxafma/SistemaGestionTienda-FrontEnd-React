import React from 'react';

interface HeroImageProps {
  image: string;
}

const HeroImage: React.FC<HeroImageProps> = ({ image }) => {
  return (
    <img
      src={image}
      className="img-fluid rounded-4"
      alt="banner"
    />
  );
};

export default HeroImage;