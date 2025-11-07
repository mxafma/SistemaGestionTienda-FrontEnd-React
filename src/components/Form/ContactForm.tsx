import React from 'react';
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';
import FormButton from './FormButton';

const ContactForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica del formulario
    console.log('Formulario enviado');
  };

  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header text-center brand fw-bold">
              Formulario de Contacto
            </div>
            <div className="card-body">
              <form id="formContacto" onSubmit={handleSubmit}>
                <FormInput 
                  id="nombre" 
                  label="Nombre completo" 
                  type="text" 
                  required={true}
                />
                <FormInput 
                  id="correo" 
                  label="Correo" 
                  type="email" 
                  required={true}
                />
                <FormTextarea 
                  id="mensaje" 
                  label="Mensaje" 
                  rows={5} 
                  required={true}
                />
                <FormButton text="Enviar mensaje" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;