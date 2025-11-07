import React from 'react';
import BlogCard from '../BlogCard/BlogCard';

interface Blog {
  id: number;
  title: string;
  description: string;
  image: string;
  slug: string;
}

interface BlogListProps {
  blogs: Blog[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
  return (
    <section className="container py-5">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </section>
  );
};

export default BlogList;