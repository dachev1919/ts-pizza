import { FC } from 'react';
// @ts-ignore
import plus from '../../../../assets/images/plus.svg';
import styles from './CartItem.module.scss';

interface CartItemProps {}

export const CartItem: FC<CartItemProps> = () => {
  // @ts-ignore
  return (
    <div className={styles.cart__item}>
      <div className={styles['cart__item-img']}>
        <img
          src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
          alt="Pizza"
        />
      </div>
      <div className={styles['cart__item-info']}>
        <h3>Сырный цыпленок</h3>
        <p>тонкое тесто, 26 см.</p>
      </div>
      <div className={styles['cart__item-count']}>
        <div
          className={`button button--outline button--circle ${styles['cart__item-count-minus']}`}
        ></div>
        <b>2</b>
        <div className={`button button--outline button--circle`}>
          <img src={plus} alt="plus" />
        </div>
      </div>
      <div className={styles['cart__item-price']}>
        <b>770 ₽</b>
      </div>
      <div className={styles['cart__item-remove']}>
        <div
          className={`button button--outline button--circle ${styles['cart__item-remove']}`}
        >
          <img src={plus} alt="remove" />
        </div>
      </div>
    </div>
  );
};
