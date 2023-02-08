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
import ReactPaginate from 'react-paginate';

interface GlobalFeedProps {
  searchValue: string;
}

export interface ISortList {
  name: string;
  sortBy: string;
}

export const GlobalFeed: FC<GlobalFeedProps> = ({ searchValue }) => {
  const sortList: ISortList[] = [
    { name: 'популярність', sortBy: 'rating' },
    { name: 'ціна', sortBy: 'price' },
    { name: 'алфавіт', sortBy: 'title' },
  ];
  const [sortBy, setSortBy] = useState<ISortList>(sortList[0]);
  const [allItems, setAllItems] = useState<IProduct[]>([]);
  const [items, setItems] = useState<IProduct[]>([]);
  const [activeCategoryName, setActiveCategoryName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<string>('desc');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // sorting logic
  useEffect(() => {
    let newItems: IProduct[] = allItems;
    if (allItems.length > 0) {
      if (activeCategoryName !== '') {
        newItems = allItems.filter(
          (item) => item.categoryName === activeCategoryName
        );
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
  }, [allItems, sortOrder, sortBy, activeCategoryName]);

  // set all items
  useEffect(() => {
    setIsLoading(true);
    getProductList(`pizzas?page=${currentPage}&limit=8`, setIsLoading).then(
      (i) => {
        setAllItems(i);
        setItems(i);
      }
    );

    window.scrollTo(0, 0);
  }, [currentPage]);

  const afterSearchFiltered = (items: IProduct[]): IProduct[] => {
    return items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  return (
    <div className="content">
      <Container>
        <div className="content__top">
          {!isLoading && (
            <>
              <CategoryList
                items={allItems}
                activeName={activeCategoryName}
                setActiveName={setActiveCategoryName}
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
        <h2 className="content__title">
          {afterSearchFiltered(items).length > 0
            ? 'Усі піци'
            : 'На жаль піца відсутня'}
        </h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(8)].map((_, index) => (
                <ProductSkeleton key={index} />
              ))
            : afterSearchFiltered(items).map((pizza) => (
                <Product key={pizza.id} {...pizza} />
              ))}
          <ReactPaginate
            pageCount={2}
            previousLabel={null}
            nextLabel={null}
            containerClassName={styles['pagination']}
            pageClassName=""
            activeClassName={styles['pagination__active']}
            pageRangeDisplayed={2}
            activeLinkClassName=""
            pageLinkClassName=""
            onPageChange={({ selected }) => setCurrentPage(++selected)}
          />
        </div>
      </Container>
    </div>
  );
};
