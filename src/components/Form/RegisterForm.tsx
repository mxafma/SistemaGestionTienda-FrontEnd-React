import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from './FormInput';
import FormButton from './FormButton';
import { createUsuario } from '../../shared/hooks/usuariosApi';
import type { UsuarioPayload } from '../../shared/hooks/usuariosApi';

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
      submitRegistration(formData);
    }
  };

  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const submitRegistration = async (formData: FormData) => {
    setServerError(null);
    setSubmitting(true);
    try {
      const nombre = (formData.get('firstName') as string) || '';
      const apellido = (formData.get('lastName') as string) || '';
      const email = (formData.get('email') as string) || '';
      const password = (formData.get('password') as string) || '';
      // build payload matching backend expectations (temporary passwordHash)
      const payload: UsuarioPayload = {
        nombre,
        apellido,
        email,
        rol: 'USER',
        activo: true,
      };
      if (password) {
        // backend currently expects passwordHash; send password as passwordHash
        (payload as any).passwordHash = password;
      }

      const created = await createUsuario(payload as any);
      // on success, navigate to login
      navigate('/login');
    } catch (err: unknown) {
      let msg = 'Error al registrar usuario';
      if ((err as any)?.response?.data) {
        const d = (err as any).response.data;
        if (typeof d === 'string') msg += ': ' + d;
        else if (d.message) msg += ': ' + d.message;
        else msg += ': ' + JSON.stringify(d);
      } else if (err instanceof Error) {
        msg += ': ' + err.message;
      }
      setServerError(msg);
    }
    setSubmitting(false);
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
          
          {serverError && <div className="alert alert-danger">{serverError}</div>}
          <FormButton text={submitting ? 'Creando...' : 'Crear cuenta'} disabled={submitting} />
          
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