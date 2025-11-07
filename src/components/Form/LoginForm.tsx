import React from 'react';
import FormInput from './FormInput';
import FormButton from './FormButton';

const LoginForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de login
    console.log('Login enviado');
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header text-center brand fw-bold">
        Iniciar Sesión
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <FormInput 
            id="email" 
            label="Correo electrónico" 
            type="email" 
            required={true}
            placeholder="ejemplo@correo.com"
          />
          <FormInput 
            id="password" 
            label="Contraseña" 
            type="password" 
            required={true}
            placeholder="Tu contraseña"
          />
          <FormButton text="Iniciar sesión" />
          
          <div className="text-center mt-3">
            <p className="mb-0">
              ¿No tienes cuenta? {' '}
              <a href="/register" className="text-decoration-none">
                Regístrate aquí
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;