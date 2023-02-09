import { FC } from 'react';
import styles from './CategoryList.module.scss';
import { IProduct } from '../product/Product';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store/store';
import { setActiveCategory } from '../../../../store/slices/filterSlice';

interface CategoryListProps {
  items: IProduct[];
}

export const CategoryList: FC<CategoryListProps> = ({ items }) => {
  const dispatch: AppDispatch = useDispatch();
  const activeCategory = useSelector(
    (state: RootState) => state.filter.activeCategory
  );
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
                ? dispatch(setActiveCategory('всі'))
                : dispatch(setActiveCategory(category))
            }
            className={`${
              (category === activeCategory ||
                // for "all" active
                (activeCategory === 'всі' && category === categoryList[0])) &&
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
