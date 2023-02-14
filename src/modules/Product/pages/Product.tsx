import styles from './Product.module.scss';
import React, { FC, useEffect, useState } from 'react';
import { IProduct } from '../../feed/components/mini-product/MiniProduct';
import { getProductList } from '../../feed/api/get-product/get-product';
import { Link, useParams } from 'react-router-dom';
import { Container } from '../../../common/components/container/Container';
import { AiFillStar } from 'react-icons/ai';
import { addProduct } from '../../../store/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

interface ProductProps {}

export const Product: FC<ProductProps> = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct>();
  const [activeType, setActiveType] = useState<string>('');
  const [activeSize, setActiveSize] = useState<number>(0);

  useEffect(() => {
    setIsLoading(true);
    const init = async () => {
      try {
        const res = await getProductList(`pizzas`);
        setProduct(res.data.find((item: IProduct) => item.id === Number(id)));
        if (product?.types) {
          setActiveType(product.types[0]);
        }
        if (product?.sizes) {
          setActiveSize(product.sizes[0]);
        }
      } catch (e) {
        console.log('ERROR - ', e);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const addToCartHandler = (product: IProduct) => {
    const item = {
      id: product.id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      type: activeType,
      size: activeSize,
    };

    dispatch(addProduct(item));
    toast.success('product added successfully');
  };

  if (isLoading) {
    return (
      <div className={`content ${styles['product__loading']}`}>
        <Container>
          <h1>Завантаження інформації...&#128579;</h1>
        </Container>
      </div>
    );
  }

  return (
    <div className={`content ${styles.product}`}>
      <Container>
        {!isLoading && product && (
          <div className={styles['product__wrapper']}>
            <div className={styles['product__image']}>
              <img src={product.imageUrl} alt="product" />
            </div>
            <div className={styles['product__info']}>
              <p className={styles['product__info-rating']}>
                <span>
                  {product.rating}
                  <AiFillStar />
                </span>
              </p>
              <h1>{product.title}</h1>
              <h2>${product.price}</h2>
              <p>
                категорія: <span>{product.categoryName}</span>
              </p>
              <p className={styles['product__info-buttons']}>
                розмір:
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className={`${activeSize === size ? styles.active : ''}`}
                    onClick={() => setActiveSize(size)}
                  >
                    {size}
                  </span>
                ))}
              </p>
              <p className={styles['product__info-buttons']}>
                тип:
                {product.types.map((type) => (
                  <span
                    key={type}
                    className={`${activeType === type ? styles.active : ''}`}
                    onClick={() => setActiveType(type)}
                  >
                    {type}
                  </span>
                ))}
              </p>
              <div className={styles['product__info-footer']}>
                <button
                  onClick={() => addToCartHandler(product)}
                  className="button button--add"
                >
                  <span>Додати у кошик</span>
                </button>
                <Link to="/ts-pizza" className="button button--outline">
                  <span>На головну</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};
