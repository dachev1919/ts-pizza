import { ComponentProps, createContext, FC, useContext } from 'react';
import styles from './Search.module.scss';
import { BsSearch } from 'react-icons/bs';

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
      <input
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
      <span>
        <BsSearch />
      </span>
    </div>
  );
};

export default SearchContext;
