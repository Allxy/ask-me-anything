import classNames from 'classnames';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../../models/User';
import './Search.css';

interface SearchProps {
  className?: string
  result?: IUser[]
  error?: string
  value: string
  isLoading: boolean
  onChange: (value: string) => void
}

function Search ({ className, isLoading, value, onChange, error, result }: SearchProps): JSX.Element {
  const inputRef = useRef <HTMLInputElement>(null);

  function handleSearchClick (): void {
    inputRef.current?.focus();
  }

  const showStatus = value.length > 0;
  const showResult = result !== undefined && (result.length > 0);

  return (
    <div className={classNames('search',
      className)}
    >
      <span onClick={handleSearchClick} className='search__icon' />
      <input
        ref={inputRef}
        value={value}
        className='search__input'
        onChange={(e) => onChange(e.target.value)}
      />
      <div
      className={classNames(
        'search__result',
        showStatus && 'search__result_active',
        showResult && showStatus && 'search__result_show'
      )
      }>
        { result?.map((el) => (
            <Link key={el.login}
              style={{ color: 'black' }}
              to={`/user/${el.login}`}
            >
              {el.login}
            </Link>
        ))}

        {!showResult && !isLoading && <p style={{ color: 'black', margin: 0 }}>No Results {error}</p>}
        {isLoading && <p style={{ color: 'black', margin: 0 }}>Loading...</p>}
      </div>
    </div>
  );
}
export default Search;
