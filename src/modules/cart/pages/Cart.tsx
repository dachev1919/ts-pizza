import { FC, useEffect } from 'react';
import cart from '../../../assets/images/cart-dark.svg';
import trash from '../../../assets/images/trash.svg';
import arrowLeft from '../../../assets/images/grey-arrow-left.svg';
import styles from './Cart.module.scss';
import { CartItem } from '../components/cart-item/CartItem';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { clearCart } from '../../../store/slices/cartSlice';
import { IProduct } from '../../feed/components/mini-product/MiniProduct';
import { EmptyCart } from '../components/empty-cart/EmptyCart';

interface CartProps {}

export const Cart: FC<CartProps> = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const sortedItems = [...items].sort(
    (a: IProduct, b: IProduct) => a.id - b.id
  );
  const dispatch = useDispatch();
  const { totalPrice, totalQuantity } = useSelector(
    (state: RootState) => state.cart
  );

  const clearCartHandler = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="content">
      <div className="container container--cart">
        <div className={styles.cart}>
          {sortedItems.length > 0 ? (
            <>
              <div className={styles.cart__top}>
                <h2 className={styles.content__title}>
                  <img src={cart} alt="cart" /> Кошик
                </h2>
                <div onClick={clearCartHandler} className={styles.cart__clear}>
                  <img src={trash} alt="trash" />
                  <span>Очистити корзину</span>
                </div>
              </div>
              <div>
                {sortedItems.map((item) => (
                  <CartItem
                    key={`${item.id}-${item.type}-${item.size}`}
                    {...item}
                  />
                ))}
              </div>
              <div className={styles.cart__bottom}>
                <div className={styles['cart__bottom-details']}>
                  <span>
                    Всього піц: <b>{totalQuantity} шт.</b>
                  </span>
                  <span>
                    Сума замовлення: <b>{totalPrice} $</b>
                  </span>
                </div>
                <div className={styles['cart__bottom-buttons']}>
                  <Link
                    to={'/ts-pizza'}
                    className="button button--outline button--add go-back-btn"
                  >
                    <img src={arrowLeft} alt="arrow" />
                    <span>Повернутися назад</span>
                  </Link>
                  <div className="button pay-btn">
                    <span>Оплатити зараз</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </div>
      </div>
    </div>
  );
};
