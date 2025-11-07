import React from 'react';

interface BlogButtonProps {
  slug: string;
  text?: string;
}

const BlogButton: React.FC<BlogButtonProps> = ({ slug, text = "Ver caso" }) => {
  return (
    <a href={`/blog/${slug}`} className="btn btn-foodix">
      {text}
    </a>
  );
};

export default BlogButton;