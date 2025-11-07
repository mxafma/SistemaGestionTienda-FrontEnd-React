import React from 'react';

interface BlogTitleProps {
  title: string;
}

const BlogTitle: React.FC<BlogTitleProps> = ({ title }) => {
  return <h2 className="fw-bold">{title}</h2>;
};

export default BlogTitle;