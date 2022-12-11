import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import './Header.css';
import Search from './ui/Search';

function Header (): JSX.Element {
  const { user } = useUser();

  return (
    <header className='header'>
      <div className='header__container'>
        <div className='header__logo'>
          <Link to='/'>
            Ask Me Anything
          </Link>
        </div>

        {(user != null) && <Search className='header__search' />}

        <nav className='header__nav'>
        {(user === null)
          ? <>
            <Link to='/sign-in'>Sign In</Link>
            <Link to='/sign-up'>Sign Up</Link>
          </>
          : <>
            <Link to="/profile">{user.login}</Link>
            <Link to="/sign-out">Sign Out</Link>
          </>
        }
        </nav>

      </div>
    </header>
  );
}

export default Header;
