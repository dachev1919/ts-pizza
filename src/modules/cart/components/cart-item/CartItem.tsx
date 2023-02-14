import { FC } from 'react';
// @ts-ignore
import plus from '../../../../assets/images/plus.svg';
import styles from './CartItem.module.scss';
import {
  addProduct,
  ICartItem,
  removeItem,
} from '../../../../store/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

interface CartItemProps extends ICartItem {}

export const CartItem: FC<CartItemProps> = ({
  id,
  imageUrl,
  title,
  size,
  type,
  count,
  price,
}) => {
  const dispatch = useDispatch();
  const cartItem = {
    id,
    type,
    size,
    count,
  };

  const addToCartHandler = () => {
    dispatch(addProduct(cartItem));
  };
  const removeFromCartHandler = () => {
    dispatch(removeItem({ ...cartItem, deleteProduct: false }));
  };
  const deleteFromCartHandler = () => {
    dispatch(removeItem({ ...cartItem, deleteProduct: true }));
  };

  return (
    <div className={styles.cart__item}>
      <div className={styles['cart__item-img']}>
        <Link to={`/ts-pizza/${id}`}>
          <img src={imageUrl} alt="Pizza" />
        </Link>
      </div>
      <div className={styles['cart__item-info']}>
        <Link to={`/ts-pizza/${id}`}>
          <h3>{title}</h3>
          <p>
            {type}, {size} см.
          </p>
        </Link>
      </div>
      <div className={styles['cart__item-count']}>
        <div
          onClick={removeFromCartHandler}
          className={`button button--outline orange button--circle ${styles['cart__item-count-minus']}`}
        ></div>
        <b>{count}</b>
        <div
          onClick={addToCartHandler}
          className={`button button--outline orange button--circle`}
        >
          <img src={plus} alt="plus" />
        </div>
      </div>
      <div className={styles['cart__item-price']}>
        <b>{price} $</b>
      </div>
      <div
        onClick={deleteFromCartHandler}
        className={styles['cart__item-remove']}
      >
        <div
          className={`button button--outline button--circle ${styles['cart__item-remove']}`}
        >
          <img src={plus} alt="remove" />
        </div>
      </div>
    </div>
  );
};
