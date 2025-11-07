import React from 'react';
import Logo from '../../components/Logo/Logo';
import ContactForm from '../../components/Form/ContactForm';

const Contact: React.FC = () => {
  return (
    <div>
      {/* Logo section */}
      <section className="text-center mt-5">
        <Logo size="large" />
      </section>
      
      {/* Contact Form */}
      <ContactForm />
    </div>
  );
};

export default Contact;