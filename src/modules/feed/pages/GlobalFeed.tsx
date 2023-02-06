import { FC } from 'react';
import { CategoryList } from '../components/category-list/CategoryList';
import { CategorySort } from '../components/category-sort/CategorySort';
import { Product } from '../components/product/Product';
import PIZZAS from '../../../mocks/pizzas.json';
import { Container } from '../../../common/components/container/Container';
import { Header } from '../../../common/components/header/Header';

interface GlobalFeedProps {}

export const GlobalFeed: FC<GlobalFeedProps> = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Container>
          <div className="content__top">
            <CategoryList />
            <CategorySort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {PIZZAS.map((pizza) => (
              <Product key={pizza.id} {...pizza} />
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};
