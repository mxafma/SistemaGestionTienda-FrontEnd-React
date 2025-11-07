import React from 'react';
import HeroDescription from './HeroDescription';
import HeroImage from './HeroImage';

interface HeroEmpresaProps {
  title: string;
  description: string;
  additionalText?: string;
  image: string;
}

const HeroEmpresa: React.FC<HeroEmpresaProps> = ({ 
  title, 
  description, 
  additionalText,
  image
}) => {
  return (
    <section className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-6 d-flex justify-content-center">
          <div style={{ maxWidth: '400px' }} className="shadow-sm">
            <HeroImage image={image} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="ms-md-3">
            <h2 className="brand">{title}</h2>
            <HeroDescription description={description} />
            {additionalText && (
              <HeroDescription description={additionalText} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroEmpresa;
