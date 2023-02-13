import styles from './Product.module.scss';
import { FC, useEffect, useState } from 'react';
import { IProduct } from '../../feed/components/mini-product/MiniProduct';
import { getProductList } from '../../feed/api/get-product/get-product';
import { useParams } from 'react-router-dom';

interface ProductProps {}

export const Product: FC<ProductProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    setIsLoading(true);
    const init = async () => {
      try {
        const res = await getProductList(`pizzas`);
        setProduct(res.data.find((item: IProduct) => item.id === Number(id)));
      } catch (e) {
        console.log('ERROR - ', e);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  return (
    <div>
      {!isLoading && product && (
        <>
          <p>{product.id}</p>
          <p>{product.title}</p>
          <p>{product.category}</p>
        </>
      )}
    </div>
  );
};
