import { Dispatch, FC, SetStateAction } from 'react';
import styles from './CategoryList.module.scss';
import { IProduct } from '../product/Product';

interface CategoryListProps {
  items: IProduct[];
  activeName: string;
  setActiveName: Dispatch<SetStateAction<string>>;
}

export const CategoryList: FC<CategoryListProps> = ({
  items,
  activeName,
  setActiveName,
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
            onClick={() =>
              category === categoryList[0]
                ? setActiveName('')
                : setActiveName(category)
            }
            className={`${
              (category === activeName ||
                // for "all" active
                (activeName === '' && category === categoryList[0])) &&
              styles.active
            }`}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
