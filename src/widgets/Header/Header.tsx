import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../shared/hooks/useCart';
import { useAuth } from '../../shared/AuthContext';
import '../../styles/global.css';

const Header = () => {
  const { totalItems, clearCart } = useCart();
  const { isAuthenticated, hasRole, logout } = useAuth();
  const isAdmin = isAuthenticated && hasRole('ADMIN');
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      logout();
    } catch (err) {
      console.warn('Error during logout', err);
    }
    try {
      clearCart();
    } catch (err) {
      // ignore if clearCart not available
    }
    navigate('/');
  };

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
              <Link className="nav-link" to="/nosotros">Nosotros</Link>
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
            {!isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Iniciar sesión</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Registrar</Link>
                </li>
              </>
            )}

            {isAuthenticated && (
              <li className="nav-item">
                <a href="#" className="nav-link" onClick={handleLogout}>Cerrar sesión</a>
              </li>
            )}

            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Administración</Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <i className="bi bi-cart"></i> Carrito ({totalItems})
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;