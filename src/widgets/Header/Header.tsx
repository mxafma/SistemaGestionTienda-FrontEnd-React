import { Link } from 'react-router-dom';
import '../../styles/global.css';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-foodix border-0">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img src="/src/shared/assets/logo.png" alt="Foodix Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navFoodix"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navFoodix">
          {/* Main Navigation */}
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blog">Blog</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contacto</Link>
            </li>
          </ul>
          {/* Secondary Navigation */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/login">Iniciar sesión</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Registrar</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <i className="bi bi-cart"></i> Carrito (<span id="cart-count">0</span>)
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;