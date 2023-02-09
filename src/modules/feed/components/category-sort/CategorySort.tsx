import { FC, useRef } from 'react';
import styles from './CategorySort.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy } from '../../../../store/slices/filterSlice';
import { RootState } from '../../../../store/store';

interface CategorySortProps {}

const sortList: string[] = ['популярність', 'ціна', 'алфавіт'];

export const CategorySort: FC<CategorySortProps> = () => {
  const dispatch = useDispatch();
  const activeSortBy = useSelector((state: RootState) => state.filter.sortBy);
  const sortRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={styles.sort}
      onClick={() =>
        (sortRef.current as Element).classList.toggle(styles.active)
      }
    >
      <div className={styles['sort__label']}>
        <b>Сортування за:</b>
        <span>{activeSortBy}</span>
      </div>
      <div ref={sortRef} className={styles['sort__popup']}>
        <ul>
          {sortList.map((item) => (
            <li
              key={`sort-${item}`}
              onClick={() => dispatch(setSortBy(item))}
              className={`${item === activeSortBy && styles.active}`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
