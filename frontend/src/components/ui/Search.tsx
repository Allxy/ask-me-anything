import './Search.css';
import classNames from 'classnames';

interface SearchProps {
  className?: string
}

function Search (props: SearchProps): JSX.Element {
  return (
    <div className='search'>
      <span className='search__icon' />
      <input className={classNames('search__input', props.className)} />
    </div>
  );
}
export default Search;
