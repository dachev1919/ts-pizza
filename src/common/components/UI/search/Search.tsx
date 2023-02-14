import { ComponentProps, FC, useRef } from 'react';
import styles from './Search.module.scss';
import { BsSearch } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../../store/store';
import { setSearchValue } from '../../../../store/slices/searchSlice';

interface SearchProps {
  placeholder: ComponentProps<'input'>['placeholder'];
}

export const Search: FC<SearchProps> = ({ placeholder }) => {
  const searchValue = useSelector(
    (state: RootState) => state.search.searchValue
  );
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const setSearchValueHandler = (text: string) => {
    dispatch(setSearchValue(text));
  };

  const clearClickHandler = (): void => {
    dispatch(setSearchValue(''));
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
        onChange={(e) => setSearchValueHandler(e.target.value)}
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
