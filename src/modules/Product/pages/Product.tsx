import styles from './Product.module.scss';
import React, { FC, useEffect, useState } from 'react';
import { IProduct } from '../../feed/components/mini-product/MiniProduct';
import { Link, useParams } from 'react-router-dom';
import { Container } from '../../../common/components/container/Container';
import { AiFillStar } from 'react-icons/ai';
import { addProduct } from '../../../store/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetProductsByPermalinkQuery } from '../../../store/slices/apiSlice';
import { ProductsLoading } from '../components/product-loading/ProductLoading';
import { LoadingError } from '../../../common/components/UI/loading-error/LoadingError';

interface ProductProps {}

export const Product: FC<ProductProps> = () => {
  const {
    data: allItems,
    isLoading,
    isError,
  } = useGetProductsByPermalinkQuery(`pizzas`);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct>();
  const [activeType, setActiveType] = useState<string>('');
  const [activeSize, setActiveSize] = useState<number>(0);

  useEffect(() => {
    if (allItems) {
      const findProduct = allItems.find((item) => item.id === Number(id));
      if (findProduct) {
        setActiveType(findProduct.types[0]);
        setActiveSize(findProduct.sizes[0]);
        setProduct(findProduct);
      }
    }
  }, [allItems, id]);

  const addToCartHandler = (product: IProduct) => {
    dispatch(addProduct({ ...product, type: activeType, size: activeSize }));
    toast.success('product added successfully');
  };

  if (isLoading) {
    return <ProductsLoading />;
  }

  if (isError || !product) {
    return <LoadingError centring={true} />;
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
