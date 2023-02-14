import { FC, useState } from 'react';
import Plus from '../../../../assets/images/plus-white.svg';
import styles from './MiniProduct.module.scss';
import { useSelector } from 'react-redux';
import { addProduct } from '../../../../store/slices/cartSlice';
import { RootState, useAppDispatch } from '../../../../store/store';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

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

export const MiniProduct: FC<ProductProps> = (product) => {
  const dispatch = useAppDispatch();
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((obj) => obj.id === product.id)
  );
  const addedCount: number =
    cartItem && cartItem.totalCount ? cartItem.totalCount : 0;
  const typeNames: string[] = ['тонке', 'традиційне'];
  const [activeType, setActiveType] = useState<string>(product.types[0]);
  const [activeSize, setActiveSize] = useState<number>(product.sizes[0]);

  const addToCartHandler = () => {
    dispatch(addProduct({ ...product, type: activeType, size: activeSize }));
    toast.success('product added successfully');
  };

  return (
    <div className={styles['pizza-block']}>
      <Link to={`/ts-pizza/${product.id}`}>
        <img
          className={styles['pizza-block__image']}
          src={product.imageUrl}
          alt="Pizza"
        />
        <h4 className={styles['pizza-block__title']}>{product.title}</h4>
      </Link>
      <div className={styles['pizza-block__selector']}>
        <ul>
          {product.types.map(
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
          {product.sizes.map((size, index) => (
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
        <div className={styles['pizza-block__price']}>от {product.price} ₽</div>
        <button onClick={addToCartHandler} className="button button--add">
          <img src={Plus} alt="plus" />
          <span>Додати</span>
          <i>{addedCount}</i>
        </button>
      </div>
    </div>
  );
};
