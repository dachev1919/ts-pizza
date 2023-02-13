import { FC, useEffect, useRef } from 'react';
import styles from './CategorySort.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy } from '../../../../store/slices/filterSlice';
import { RootState } from '../../../../store/store';

function assertIsNode(e: EventTarget | null): asserts e is Node {
  if (!e || !('nodeType' in e)) {
    throw new Error(`Node expected`);
  }
}

interface CategorySortProps {}

const sortList: string[] = ['популярність', 'ціна', 'алфавіт'];

export const CategorySort: FC<CategorySortProps> = () => {
  const dispatch = useDispatch();
  const activeSortBy = useSelector((state: RootState) => state.filter.sortBy);
  const sortRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const clickOutsideHandler = (event: MouseEvent) => {
      assertIsNode(event.target);
      if (!sortRef.current!.contains(event.target)) {
        (sortRef.current as Element).classList.remove(styles.active);
      }
    };

    document.body.addEventListener('click', clickOutsideHandler);

    return () => {
      document.body.removeEventListener('click', clickOutsideHandler);
    };
  }, []);

  return (
    <div
      ref={sortRef}
      className={styles.sort}
      onClick={() =>
        (sortRef.current as Element).classList.toggle(styles.active)
      }
    >
      <div className={styles['sort__label']}>
        <b>Сортування за:</b>
        <span>{activeSortBy}</span>
      </div>
      <div className={styles['sort__popup']}>
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
