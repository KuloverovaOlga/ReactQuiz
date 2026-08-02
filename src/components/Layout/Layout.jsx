import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header';

const Layout = () => {
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <div className={`wrapp`}>
      {!isHomePage && <Header />}
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
