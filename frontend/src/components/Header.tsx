import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import './Header.css';
import Search from './Search';

function Header (): JSX.Element {
  const { user } = useUser();

  return (
    <header className='header'>
      <div className='header__container'>
        <div className='header__logo'>
          <Link to="/">
            Ask Me Anything
          </Link>
        </div>

        <nav className='header__nav'>
          <Link to="/sign-in">Вход</Link>
          <Link to="/sign-up">Регистрация</Link>
        </nav>
        {user?.name}
        <Search className="header__search" />
      </div>
    </header>
  );
}

export default Header;
