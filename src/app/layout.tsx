import { Outlet } from 'react-router-dom';
import Header from '../widgets/Header/Header';
import Footer from '../widgets/Footer/Footer';

const Layout = () => {
  return (
    <div className="app-layout">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;