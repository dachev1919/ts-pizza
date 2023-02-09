import { FC, useRef } from 'react';
import styles from './CategorySort.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy } from '../../../../store/slices/filterSlice';
import { RootState } from '../../../../store/store';

interface CategorySortProps {}

export interface ISortList {
  name: string;
  sortBy: string;
}

const sortList: ISortList[] = [
  { name: 'популярність', sortBy: 'rating' },
  { name: 'ціна', sortBy: 'price' },
  { name: 'алфавіт', sortBy: 'title' },
];

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
        <span>{activeSortBy.name}</span>
      </div>
      <div ref={sortRef} className={styles['sort__popup']}>
        <ul>
          {sortList.map((item) => (
            <li
              key={`sort-${item.sortBy}`}
              onClick={() => dispatch(setSortBy(item))}
              className={`${
                item.sortBy === activeSortBy.sortBy && styles.active
              }`}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
