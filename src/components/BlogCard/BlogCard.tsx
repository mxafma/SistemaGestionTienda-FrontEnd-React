import React from 'react';
import BlogTitle from './BlogTitle';
import BlogDescription from './BlogDescription';
import BlogImage from './BlogImage';
import BlogButton from './BlogButton';

interface Blog {
  id: number;
  title: string;
  description: string;
  image: string;
  slug: string;
}

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <div className="row align-items-center mb-5">
      <div className="col-md-6">
        <BlogTitle title={blog.title} />
        <BlogDescription description={blog.description} />
        <BlogButton slug={blog.slug} />
      </div>
      <div className="col-md-6">
        <BlogImage src={blog.image} alt={blog.title} />
      </div>
    </div>
  );
};

export default BlogCard;