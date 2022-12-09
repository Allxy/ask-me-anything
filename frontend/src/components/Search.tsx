import './Search.css';
import classname from 'classnames';

interface SearchProps {
  className?: string
}

function Search (props: SearchProps): JSX.Element {
  return (
    <div className='search'>
      <span className='search__icon' />
      <input className={classname('search__input', props.className)} />
    </div>
  );
}
export default Search;
