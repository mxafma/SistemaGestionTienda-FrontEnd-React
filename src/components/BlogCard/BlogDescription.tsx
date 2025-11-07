import React from 'react';

interface BlogDescriptionProps {
  description: string;
}

const BlogDescription: React.FC<BlogDescriptionProps> = ({ description }) => {
  return <p>{description}</p>;
};

export default BlogDescription;