import { FC, useState } from 'react';

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
    <div className="categories">
      <ul>
        {categoryList.map((category, index) => (
          <li
            key={index}
            onClick={() => onClickCategoryHandler(index)}
            className={`${activeCategory === index && 'active'}`}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
