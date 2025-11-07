import React from 'react';
import Logo from '../../components/Logo/Logo';
import LoginForm from '../../components/Form/LoginForm';

const Login: React.FC = () => {
  return (
    <div>
      {/* Logo section */}
      <section className="text-center mt-5">
        <Logo size="large" />
      </section>
      
      {/* Login Form */}
      <section className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <LoginForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;