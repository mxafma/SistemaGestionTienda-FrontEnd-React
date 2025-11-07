import React from 'react';
import Logo from '../../components/Logo/Logo';
import RegisterForm from '../../components/Form/RegisterForm';

const Register: React.FC = () => {
  return (
    <div>
      {/* Logo section */}
      <section className="text-center mt-5">
        <Logo size="large" />
      </section>
      
      {/* Register Form */}
      <section className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <RegisterForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;