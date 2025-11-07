import React, { useState } from 'react';
import FormInput from './FormInput';
import FormButton from './FormButton';

const RegisterForm: React.FC = () => {
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    
    const newErrors: {[key: string]: string} = {};
    
    // Validar contraseña mínimo 8 caracteres
    if (password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }
    
    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    setErrors(newErrors);
    
    // Si no hay errores, enviar
    if (Object.keys(newErrors).length === 0) {
      console.log('Registro válido');
      // Aquí iría la lógica de registro
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header text-center brand fw-bold">
        Crear Cuenta
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <FormInput 
                id="firstName" 
                label="Nombre" 
                type="text" 
                required={true}
                placeholder="Tu nombre"
              />
            </div>
            <div className="col-md-6">
              <FormInput 
                id="lastName" 
                label="Apellido" 
                type="text" 
                required={true}
                placeholder="Tu apellido"
              />
            </div>
          </div>
          
          <FormInput 
            id="email" 
            label="Correo electrónico" 
            type="email" 
            required={true}
            placeholder="ejemplo@correo.com"
          />
          
          <FormInput 
            id="phone" 
            label="Teléfono" 
            type="tel" 
            required={false}
            placeholder="+56 9 1234 5678"
          />
          
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input 
              type="password"
              id="password"
              name="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              required
              placeholder="Mínimo 8 caracteres"
              minLength={8}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña</label>
            <input 
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              required
              placeholder="Repite tu contraseña"
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback">{errors.confirmPassword}</div>
            )}
          </div>
          
          <div className="mb-3 form-check">
            <input 
              type="checkbox" 
              className="form-check-input" 
              id="termsCheck" 
              required 
            />
            <label className="form-check-label" htmlFor="termsCheck">
              Acepto los {' '}
              <a href="/terms" className="text-decoration-none">
                términos y condiciones
              </a>
            </label>
          </div>
          
          <FormButton text="Crear cuenta" />
          
          <div className="text-center mt-3">
            <p className="mb-0">
              ¿Ya tienes cuenta? {' '}
              <a href="/login" className="text-decoration-none">
                Inicia sesión aquí
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;