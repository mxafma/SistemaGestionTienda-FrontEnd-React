import '../../styles/global.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Foodix. Todos los derechos reservados.</p>
        <form className="d-flex justify-content-center mt-3">
          <input
            type="email"
            className="form-control w-50"
            placeholder="Ingresa tu correo electrónico"
          />
          <button type="submit" className="btn btn-primary ms-2">
            Suscribirse
          </button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;