import { FC, useState } from 'react';
import styles from './CategoryList.module.scss';

interface CategoryListProps {}

const categoryList: string[] = [
  'Всі',
  "М'ясні",
  'Вегетаріанська',
  'Гриль',
  'Гострі',
  'Закриті',
];

export const CategoryList: FC<CategoryListProps> = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const onClickCategoryHandler: (id: number) => void = (id) => {
    setActiveCategory(id);
  };

  return (
    // @ts-ignore
    <div className={styles.categories}>
      <ul>
        {categoryList.map((category, index) => (
          <li
            key={index}
            onClick={() => onClickCategoryHandler(index)}
            // @ts-ignore
            className={`${activeCategory === index && styles.active}`}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
