import { FC, useState } from 'react';
//@ts-ignore
import Plus from '../../../../assets/images/plus-white.svg';
import styles from './Product.module.scss';

export interface IProduct {
  id: number;
  imageUrl: string;
  title: string;
  types: string[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}

interface ProductProps extends IProduct {}

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
    <div className={styles['pizza-block']}>
      <img
        className={styles['pizza-block__image']}
        src={imageUrl}
        alt="Pizza"
      />
      <h4 className={styles['pizza-block__title']}>{title}</h4>
      <div className={styles['pizza-block__selector']}>
        <ul>
          {types.map(
            (type, index) =>
              typeNames.includes(type) && (
                <li
                  className={`${type === activeType && styles.active}`}
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
              className={`${activeSize === size && styles.active}`}
              onClick={() => setActiveSize(size)}
              key={`li-${index}`}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className={styles['pizza-block__bottom']}>
        <div className={styles['pizza-block__price']}>от {price} ₽</div>
        <button
          onClick={() => setCount((prevState) => prevState + 1)}
          className="button button--add"
        >
          <img src={Plus} alt="plus" />
          <span>Додати</span>
          <i>{count}</i>
        </button>
      </div>
    </div>
  );
};
