import { ComponentProps, Dispatch, FC, SetStateAction } from 'react';
import styles from './Search.module.scss';
import { BsSearch } from 'react-icons/bs';

interface SearchProps {
  placeholder: ComponentProps<'input'>['placeholder'];
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

export const Search: FC<SearchProps> = ({
  placeholder,
  searchValue,
  setSearchValue,
}) => {
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
