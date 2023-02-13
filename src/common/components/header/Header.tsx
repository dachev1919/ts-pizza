import { FC } from 'react';
// @ts-ignore
import logo from '../../../assets/images/pizza-logo.svg';
import styles from './Header.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { Search } from '../UI/search/Search';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { ReactSVG } from 'react-svg';
// @ts-ignore
import cartSvg from '../../../assets/images/cart.svg';

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  const { pathname } = useLocation();
  const { totalQuantity, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );
  return (
    <div className={styles.header}>
      <div className={`${styles.header__container} container`}>
        <div>
          <Link className={styles.header__logo} to="/ts-pizza">
            <div className={styles.header__logo}>
              <img width="38" src={logo} alt="Pizza logo" />
              <div>
                <h1>TS Pizza</h1>
                <p>найсмачніша піца</p>
              </div>
            </div>
          </Link>
        </div>
        {pathname === '/ts-pizza' && <Search placeholder="Пошук піци" />}
        <div className={styles['header__cart']}>
          <Link to="/ts-pizza/cart" className="button button--cart">
            <span>{totalPrice} $</span>
            <div className="button__delimiter"></div>
            <ReactSVG src={cartSvg} />
            <span>{totalQuantity}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
