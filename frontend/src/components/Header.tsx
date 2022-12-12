import { Link, useFetcher } from 'react-router-dom';
import Logo from './ui/Logo';
import Search from './ui/Search';
import Avatar from './ui/Avatar';
import './Header.css';
import { useEffect, useState } from 'react';
import useUser from './hooks/useUser';
import useDebounce from './hooks/useDebounce';

function Header (): JSX.Element {
  const { data, load } = useFetcher();
  const { user } = useUser();
  const [search, setSearch] = useState('');
  const [debouncedSearch, isPending] = useDebounce(search, 500);

  useEffect(() => {
    if (search !== '') {
      load('/search?limit=10&page=1&login=' + debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <header className='header'>
      <div className='header__container'>

        <Logo link="/" className='header__logo' />

        {(user != null) &&
        <Search
          value={search}
          onChange={setSearch}
          className='header__search'
          isLoading={isPending}
          result={data ?? null}
        />}

        <nav className='header__nav'>
        {(user === null)
          ? <>
            <Link to='/sign-in'>Sign In</Link>
            <Link to='/sign-up'>Sign Up</Link>
          </>
          : <>
            <Link className='header__profile-link' to="/profile">
              <Avatar className='header__avatar' src="https://cdn.forbes.ru/forbes-static/608x342/new/2022/11/4-636273af4beec.webp" />
              <span>{user.login}</span>
            </Link>
            <Link to="/sign-out">Sign Out</Link>
          </>
        }
        </nav>

      </div>
    </header>
  );
}

export default Header;
