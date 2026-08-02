import cls from './Header.module.scss';

import logo from '../../assets/images/logo.png';


import Search from '../Search/Search';
import { useLocation, useNavigate, useMatch } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isQuizPage = useMatch('quizes/:quizesId');

  const handleLogoClick = (e) => {
    e.preventDefault();

    if (isQuizPage) {
      navigate('/', { replace: true });
    } else {
      navigate('/');
    }
  };
  return (
    <header className={`container`}>
      <div className={cls.inner}>
        <a onClick={handleLogoClick} replace={isQuizPage} className={cls.logo}>
          <img alt="logo" src={logo} />
        </a>
        {location.pathname === '/quizes' && <Search />}

      </div>
    </header>
  );
};

export default Header;
