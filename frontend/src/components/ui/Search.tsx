import classNames from 'classnames';
import { useRef } from 'react';
import './Search.css';

interface SearchProps {
  className?: string
}

function Search (props: SearchProps): JSX.Element {
  const inputRef = useRef <HTMLInputElement>(null);

  function handleSearchClick (): void {
    inputRef.current?.focus();
  }

  return (
    <div className={classNames('search', props.className)}>
      <span onClick={handleSearchClick} className='search__icon' />
      <input
        ref={inputRef}
        className='search__input'
        onBlur={() => (inputRef.current != null) && (inputRef.current.value = '')}
      />
    </div>
  );
}
export default Search;
