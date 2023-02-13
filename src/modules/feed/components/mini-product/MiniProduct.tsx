import { FC, useState } from 'react';
//@ts-ignore
import Plus from '../../../../assets/images/plus-white.svg';
import styles from './MiniProduct.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../../../store/slices/cartSlice';
import { RootState } from '../../../../store/store';
import { Link } from 'react-router-dom';

export interface IProduct {
  id: number;
  imageUrl: string;
  title: string;
  types: string[];
  sizes: number[];
  price: number;
  category: number;
  categoryName: string;
  rating: number;
}

interface ProductProps extends IProduct {}

export const MiniProduct: FC<ProductProps> = ({
  id,
  imageUrl,
  title,
  types,
  sizes,
  price,
  category,
  rating,
}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((obj) => obj.id === id)
  );
  const addedCount: number =
    cartItem && cartItem.totalCount ? cartItem.totalCount : 0;
  const typeNames: string[] = ['тонке', 'традиційне'];
  const [activeType, setActiveType] = useState<string>(types[0]);
  const [activeSize, setActiveSize] = useState<number>(sizes[0]);

  const addToCartHandler = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: activeType,
      size: activeSize,
    };

    dispatch(addProduct(item));
  };

  return (
    <div className={styles['pizza-block']}>
      <Link to={`/ts-pizza/${id}`}>
        <img
          className={styles['pizza-block__image']}
          src={imageUrl}
          alt="Pizza"
        />
        <h4 className={styles['pizza-block__title']}>{title}</h4>
      </Link>
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
        <button onClick={addToCartHandler} className="button button--add">
          <img src={Plus} alt="plus" />
          <span>Додати</span>
          <i>{addedCount}</i>
        </button>
      </div>
    </div>
  );
};
