import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from './FormInput';
import FormButton from './FormButton';
import { login } from '../../shared/hooks/authApi';
import { useAuth } from '../../shared/AuthContext';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita la recarga de la página
    setError(null); // Limpia el error previo
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const email = (fd.get('email') as string) || '';
    const password = (fd.get('password') as string) || '';

    if (!email || !password) {
      setError('Email y contraseña son obligatorios');
      return;
    }

    setSubmitting(true);
    try {
      const res = await login({ email, password });
      if (res && res.accessToken && res.usuario) {
        // Usa AuthContext para guardar el token y el usuario
        authLogin(res.accessToken, res.usuario);
        navigate('/');
      } else {
        setError(res?.message || 'Usuario o contraseña incorrectos');
      }
    } catch (err: unknown) {
      if ((err as any)?.response?.status === 401) {
        setError('Usuario o contraseña incorrectos');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al comunicarse con el servidor');
      }
    }
    setSubmitting(false);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header text-center brand fw-bold">Iniciar Sesión</div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <FormInput id="email" label="Correo electrónico" type="email" required={true} placeholder="ejemplo@correo.com" />
          <FormInput id="password" label="Contraseña" type="password" required={true} placeholder="Tu contraseña" />
          <FormButton text={submitting ? 'Entrando...' : 'Iniciar sesión'} disabled={submitting} />

          <div className="text-center mt-3">
            <p className="mb-0">
              ¿No tienes cuenta? {' '}
              <a href="/register" className="text-decoration-none">Regístrate aquí</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;