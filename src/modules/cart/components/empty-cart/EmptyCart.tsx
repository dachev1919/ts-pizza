import { FC } from 'react';
import styles from './EmptyCart.module.scss';
import emptyCart from '../../../../assets/images/empty-cart.png';
import arrowLeft from '../../../../assets/images/grey-arrow-left.svg';
import { Link } from 'react-router-dom';

interface EmptyCartProps {}

export const EmptyCart: FC<EmptyCartProps> = () => {
  return (
    <div className={styles['empty-cart']}>
      <img src={emptyCart} alt="empty-cart" />
      <h2>Кошик порожній&#128533;</h2>
      <p>
        Найімовірніше, ви не замовили ще піцу. Щоб зробити замовлення, перейдіть
        на головну сторінку
      </p>
      <Link
        to={'/ts-pizza'}
        className="button button--outline button--add go-back-btn"
      >
        <img src={arrowLeft} alt="arrow" />
        <span>Повернутися назад</span>
      </Link>
    </div>
  );
};
