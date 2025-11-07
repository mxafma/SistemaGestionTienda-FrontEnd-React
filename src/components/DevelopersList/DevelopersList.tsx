import React from 'react';
import DeveloperCard from '../DeveloperCard/DeveloperCard';

interface Developer {
  name: string;
  title: string;
  description: string;
  avatarSrc: string;
}

interface DevelopersListProps {
  developers: Developer[];
}

const DevelopersList: React.FC<DevelopersListProps> = ({ developers }) => {
  return (
    <div className="row justify-content-center">
      {developers.map((developer, index) => (
        <div key={index} className="col-md-6 col-lg-4 mb-4">
          <DeveloperCard 
            name={developer.name}
            title={developer.title}
            description={developer.description}
            avatarSrc={developer.avatarSrc}
          />
        </div>
      ))}
    </div>
  );
};

export default DevelopersList;