import {
  ComponentProps,
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useRef,
} from 'react';
import styles from './Search.module.scss';
import { BsSearch } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';

interface SearchProps {
  placeholder: ComponentProps<'input'>['placeholder'];
}

type SearchType = {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
};

const ISearch = {
  searchValue: '',
  setSearchValue: () => {},
};

const SearchContext = createContext<SearchType>(ISearch);

export const Search: FC<SearchProps> = ({ placeholder }) => {
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const clearClickHandler = (): void => {
    setSearchValue('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={styles.search!}>
      <label htmlFor="searchInput">
        <BsSearch />
      </label>
      <input
        ref={inputRef}
        id="searchInput"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        type="text"
      />
      <div
        className={`${styles.placeholder} ${
          searchValue !== '' && styles.active
        }`}
      >
        {placeholder}
      </div>
      {searchValue.length > 0 && (
        <span onClick={clearClickHandler}>
          <CgClose />
        </span>
      )}
    </div>
  );
};

export default SearchContext;
