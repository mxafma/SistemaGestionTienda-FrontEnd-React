import React from 'react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import DevelopersList from '../../components/DevelopersList/DevelopersList';

interface Developer {
  name: string;
  title: string;
  description: string;
  avatarSrc: string;
}

interface DevelopersSectionProps {
  title?: string;
  developers: Developer[];
  backgroundColor?: string;
  textAlign?: 'left' | 'center' | 'right';
}

const DevelopersSection: React.FC<DevelopersSectionProps> = ({ 
  title = "Desarrolladores",
  developers,
  backgroundColor = "bg-light",
  textAlign = "center"
}) => {
  return (
    <section className={`${backgroundColor} py-5`}>
      <div className={`container text-${textAlign}`}>
        <SectionTitle title={title} />
        <DevelopersList developers={developers} />
      </div>
    </section>
  );
};

export default DevelopersSection;