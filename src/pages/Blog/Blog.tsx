import React from 'react';
import HeroAbout from '../../widgets/Hero/HeroAbout';
import BlogList from '../../components/BlogCard/BlogList';
import blogsData from '../../data/blogs.json';

const Blog: React.FC = () => {
  // Importamos los datos desde el JSON
  const blogs = blogsData;

  return (
    <div>
      {/* Hero Blog - Reutilizando HeroAbout */}
      <HeroAbout 
        title="Noticias & Curiosidades"
        description="Mantente informado con datos interesantes sobre el mundo gourmet y nuestra tienda."
        backgroundImage="/src/shared/assets/banner3.jpg"
      />

      {/* Listado de Blogs */}
      <BlogList blogs={blogs} />
    </div>
  );
};

export default Blog;