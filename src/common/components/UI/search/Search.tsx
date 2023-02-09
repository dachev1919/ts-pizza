import { ComponentProps, createContext, FC, useContext } from 'react';
import styles from './Search.module.scss';
import { BsSearch } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';

interface SearchProps {
  placeholder: ComponentProps<'input'>['placeholder'];
}

type SearchType = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

const ISearch = {
  searchValue: '',
  setSearchValue: () => {},
};

const SearchContext = createContext<SearchType>(ISearch);

export const Search: FC<SearchProps> = ({ placeholder }) => {
  const { searchValue, setSearchValue } = useContext(SearchContext);

  return (
    <div className={styles.search!}>
      <label htmlFor="searchInput">
        <BsSearch />
      </label>
      <input
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
        <span onClick={() => setSearchValue('')}>
          <CgClose />
        </span>
      )}
    </div>
  );
};

export default SearchContext;
