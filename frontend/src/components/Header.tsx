import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Logo from './ui/Logo';
import Search from './ui/Search';
import './Header.css';

function Header (): JSX.Element {
  const { user } = useUser();

  return (
    <header className='header'>
      <div className='header__container'>

        <Logo link="/" className='header__logo' />

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
