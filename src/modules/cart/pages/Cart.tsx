import { FC, useEffect } from 'react';
// @ts-ignore
import cart from '../../../assets/images/cart.svg';
// @ts-ignore
import trash from '../../../assets/images/trash.svg';
// @ts-ignore
import arrowLeft from '../../../assets/images/grey-arrow-left.svg';
import styles from './Cart.module.scss';
import { CartItem } from '../components/cart-item/CartItem';
import { Link } from 'react-router-dom';

interface CartProps {}

export const Cart: FC<CartProps> = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="content">
      <div className="container container--cart">
        <div className={styles.cart}>
          <div className={styles.cart__top}>
            <h2 className={styles.content__title}>
              <img src={cart} alt="cart" /> Кошик
            </h2>
            <div className={styles.cart__clear}>
              <img src={trash} alt="trash" />
              <span>Очистить корзину</span>
            </div>
          </div>
          <div>
            <CartItem />
            <CartItem />
            <CartItem />
          </div>
          <div className={styles.cart__bottom}>
            <div className={styles['cart__bottom-details']}>
              <span>
                Всего пицц: <b>3 шт.</b>
              </span>
              <span>
                Сумма заказа: <b>900 ₽</b>
              </span>
            </div>
            <div className={styles['cart__bottom-buttons']}>
              <Link
                to={'/fs-pizza'}
                className="button button--outline button--add go-back-btn"
              >
                <img src={arrowLeft} alt="arrow" />
                <span>Вернуться назад</span>
              </Link>
              <div className="button pay-btn">
                <span>Оплатить сейчас</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
