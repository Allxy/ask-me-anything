import './Header.css';
import Search from './Search';

function Header (): JSX.Element {
  return (
    <header className='header'>
      <div className='header__container'>
        <div className='header__logo'>
          Ask Me Anything
        </div>
        <Search className="header__search" />
      </div>
    </header>
  );
}

export default Header;
