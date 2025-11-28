import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout';
import Home from '../pages/Home/Home';
import Products from '../pages/Products/Products';
import Cart from '../pages/Cart/Cart';
import Nosotros from '../pages/Nosotros/Nosotros';
import Blog from '../pages/Blog/Blog';
import Contact from '../pages/Contact/Contact';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import ProductDetail from '../pages/ProductDetail/ProductDetail';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import ProductosPage from '../pages/Admin/ProductosPage';
import UsuariosPage from '../pages/Admin/UsuariosPage';
import BoletasPage from '../pages/Admin/BoletasPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        {/* Rutas de administrador */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/productos" element={<ProductosPage />} />
        <Route path="/admin/usuarios" element={<UsuariosPage />} />
        <Route path="/admin/boletas" element={<BoletasPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;