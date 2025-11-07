import React from 'react';
import HeroAbout from '../../widgets/Hero/HeroAbout';
import HeroEmpresa from '../../widgets/Hero/HeroEmpresa';
import DevelopersSection from '../../widgets/DevelopersSection/DevelopersSection';
import developersData from '../../data/developers.json';

const Nosotros: React.FC = () => {
  // Importamos los datos desde el JSON
  const developers = developersData;

  return (
    <div>
      {/* Hero Nosotros */}
      <HeroAbout 
        title="Sobre Foodix"
        description="Conoce más sobre nuestra tienda y quiénes estamos detrás de este proyecto."
        backgroundImage="/src/shared/assets/banner5.png"
      />

      {/* Sección empresa */}
      <HeroEmpresa 
        title="Nuestra historia"
        description="En Foodix somos una tienda especializada en insumos gourmet para restaurantes, chefs profesionales y amantes de la cocina. También pensamos en quienes simplemente buscan un ingrediente especial para darle un toque único a sus platos en casa. Trabajamos con productos de la más alta calidad y estamos comprometidos con ofrecer un servicio confiable, rápido y cercano, para que cada experiencia culinaria sea memorable."
        additionalText="Nuestro objetivo es ser un puente entre la cocina profesional y la pasión culinaria de cada persona, entregando ingredientes que inspiran creatividad y sabores que marcan la diferencia."
        image="/src/shared/assets/logo4.png"
      />

      {/* Sección desarrolladores */}
      <DevelopersSection 
        title="Desarrolladores"
        developers={developers}
      />
    </div>
  );
};

export default Nosotros;