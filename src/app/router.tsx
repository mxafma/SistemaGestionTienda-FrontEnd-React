import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout';
import Home from '../pages/Home/Home';
import Products from '../pages/Products/Products';
import Cart from '../pages/Cart/Cart';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;