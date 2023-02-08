import { FC, useEffect, useState } from 'react';
import { CategoryList } from '../components/category/CategoryList';
import { CategorySort } from '../components/category-sort/CategorySort';
import { IProduct, Product } from '../components/product/Product';
import { Container } from '../../../common/components/container/Container';
import { ProductSkeleton } from '../components/product/ProductSkeleton';
import { getProductList } from '../components/api/get-product/get-product';
import styles from './GlobalFeed.module.scss';
//@ts-ignore
import arrowUp from '../../../assets/images/arrow-up.svg';

interface GlobalFeedProps {}

export interface ISortList {
  name: string;
  sortBy: string;
}

export const GlobalFeed: FC<GlobalFeedProps> = () => {
  const sortList: ISortList[] = [
    { name: 'популярності', sortBy: 'rating' },
    { name: 'ціні', sortBy: 'price' },
    { name: 'алфавіту', sortBy: 'title' },
  ];
  const [sortBy, setSortBy] = useState<ISortList>(sortList[0]);
  const [allItems, setAllItems] = useState<IProduct[]>([]);
  const [items, setItems] = useState<IProduct[]>([]);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<string>('desc');

  // sorting logic
  useEffect(() => {
    let newItems: IProduct[] = allItems;
    if (allItems.length > 0) {
      if (categoryId !== 0) {
        newItems = allItems.filter((item) => item.category === categoryId);
      } else {
        newItems = [...allItems];
      }

      switch (sortBy.sortBy) {
        case 'rating':
          newItems = newItems.sort((a, b) => Number(a.rating > b.rating));
          if (sortOrder === 'asc') {
            newItems.reverse();
          }
          break;
        case 'price':
          newItems = newItems.sort((a, b) => Number(a.price > b.price));
          if (sortOrder === 'asc') {
            newItems.reverse();
          }
          break;
        case 'title':
          newItems = newItems.sort((a, b) => Number(a.title > b.title));
          if (sortOrder === 'asc') {
            newItems.reverse();
          }
          break;
      }
      setItems(newItems);
    }
  }, [sortOrder, sortBy, categoryId]);

  // set all items
  useEffect(() => {
    if (!allItems.length) {
      getProductList('pizzas', setIsLoading).then((i) => {
        setAllItems(i);
        setItems(i);
      });
    }

    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="content">
      <Container>
        <div className="content__top">
          {!isLoading && (
            <>
              <CategoryList
                items={allItems}
                activeId={categoryId}
                setActiveId={setCategoryId}
              />
              <CategorySort
                sortList={sortList}
                activeSortBy={sortBy}
                setSortBy={setSortBy}
              />
              <div className={styles.sortAscDesc}>
                <div onClick={() => setSortOrder('asc')}>
                  <img src={arrowUp} alt="up" />
                  <span>зрост.</span>
                </div>
                <div onClick={() => setSortOrder('desc')}>
                  <img
                    style={{ transform: 'rotate(180deg)' }}
                    src={arrowUp}
                    alt="down"
                  />
                  <span>спад.</span>
                </div>
              </div>
            </>
          )}
        </div>
        <h2 className="content__title">Усі піци</h2>
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
