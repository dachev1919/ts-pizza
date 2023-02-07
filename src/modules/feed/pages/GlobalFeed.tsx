import { FC, useEffect, useState } from 'react';
import { CategoryList } from '../components/category-list/CategoryList';
import { CategorySort } from '../components/category-sort/CategorySort';
import { IProduct, Product } from '../components/product/Product';
import { Container } from '../../../common/components/container/Container';
import { ProductSkeleton } from '../components/product/ProductSkeleton';

interface GlobalFeedProps {}

export const GlobalFeed: FC<GlobalFeedProps> = () => {
  const [items, setItems] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const api = async () => {
      fetch('https://63e21a47109336b6cbff8c48.mockapi.io/pizzas', {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((result) => {
          setItems(result);
          setIsLoading(false);
        });
    };

    api();
  }, []);

  return (
    <div className="content">
      <Container>
        <div className="content__top">
          <CategoryList />
          <CategorySort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(8)].map((_, index) => (
                <ProductSkeleton key={index} />
              ))
            : items.map((pizza) => <Product key={pizza.id} {...pizza} />)}
        </div>
      </Container>
    </div>
  );
};
