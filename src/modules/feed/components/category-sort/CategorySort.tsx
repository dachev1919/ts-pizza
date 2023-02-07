import { FC, useRef, useState } from 'react';
import { ArrowUpSvg } from '../../../../common/components/UI/ArrowUpSvg';
import styles from './CategorySort.module.scss';

interface CategorySortProps {}

export const CategorySort: FC<CategorySortProps> = () => {
  const sortList: string[] = ['популярності', 'ціні', 'алфавіту'];
  const [activeSort, setActiveSort] = useState<string>(sortList[0]);
  const sortRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={styles.sort}
      onClick={() =>
        (sortRef.current as Element).classList.toggle(styles.active)
      }
    >
      <div className={styles['sort__label']}>
        <ArrowUpSvg />
        <b>Сортування за:</b>
        <span>{activeSort}</span>
      </div>
      <div ref={sortRef} className={styles['sort__popup']}>
        <ul>
          {sortList.map((item) => (
            <li
              key={`sort-${item}`}
              onClick={() => setActiveSort(item)}
              className={`${item === activeSort && styles.active}`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
