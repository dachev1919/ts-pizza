import { Dispatch, FC, SetStateAction } from 'react';
import styles from './CategoryList.module.scss';
import { IProduct } from '../product/Product';

interface CategoryListProps {
  items: IProduct[];
  activeId: number;
  setActiveId: Dispatch<SetStateAction<number>>;
}

export const CategoryList: FC<CategoryListProps> = ({
  items,
  activeId,
  setActiveId,
}) => {
  let categoryList = items.map((item) => item.categoryName);
  categoryList.unshift('всі');
  // remove duplicate
  categoryList = categoryList.filter(
    (category, index) => categoryList.indexOf(category) === index
  );

  return (
    <div className={styles.categories}>
      <ul>
        {categoryList.map((category, index) => (
          <li
            key={index}
            onClick={() => setActiveId(index)}
            className={`${index === activeId && styles.active}`}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
