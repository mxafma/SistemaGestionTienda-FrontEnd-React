import React from 'react';

interface DeveloperCardProps {
  name: string;
  title: string;
  description: string;
  avatarSrc: string;
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({
  name,
  title,
  description,
  avatarSrc
}) => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <img 
          src={avatarSrc}
          alt={name}
          className="rounded-circle mb-3"
          width="120"
          height="120"
        />
        <h5 className="fw-bold">{name}</h5>
        <p className="text-muted">{title}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default DeveloperCard;