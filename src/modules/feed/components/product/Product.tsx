import { FC, useState } from 'react';
import { PlusSvg } from '../../../../common/components/UI/PlusSvg';

interface ProductProps {
  id: number;
  imageUrl: string;
  title: string;
  types: string[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}

export const Product: FC<ProductProps> = ({
  id,
  imageUrl,
  title,
  types,
  sizes,
  price,
  category,
  rating,
}) => {
  const [count, setCount] = useState<number>(0);
  const typeNames: string[] = ['тонке', 'традиційне'];
  const [activeType, setActiveType] = useState<string>(types[0]);
  const [activeSize, setActiveSize] = useState<number>(sizes[0]);

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map(
            (type, index) =>
              typeNames.includes(type) && (
                <li
                  className={`${type === activeType && 'active'}`}
                  onClick={() => setActiveType(type)}
                  key={`type-${index}`}
                >
                  {type}
                </li>
              )
          )}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              className={`${activeSize === size && 'active'}`}
              onClick={() => setActiveSize(size)}
              key={`li-${index}`}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button
          onClick={() => setCount((prevState) => prevState + 1)}
          className="button button--outline button--add"
        >
          <PlusSvg />
          <span>Додати</span>
          <i>{count}</i>
        </button>
      </div>
    </div>
  );
};
