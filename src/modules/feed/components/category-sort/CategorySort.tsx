import { Dispatch, FC, SetStateAction, useRef } from 'react';
import styles from './CategorySort.module.scss';
import { ISortList } from '../../pages/GlobalFeed';

interface CategorySortProps {
  sortList: ISortList[];
  activeSortBy: ISortList;
  setSortBy: Dispatch<SetStateAction<ISortList>>;
}

export const CategorySort: FC<CategorySortProps> = ({
  sortList,
  activeSortBy,
  setSortBy,
}) => {
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
              onClick={() => setSortBy(item)}
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
