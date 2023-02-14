import { FC, useCallback, useEffect, useState } from 'react';
import { CategoryList } from '../components/category-list/CategoryList';
import { CategorySort } from '../components/category-sort/CategorySort';
import { IProduct, MiniProduct } from '../components/mini-product/MiniProduct';
import { Container } from '../../../common/components/container/Container';
import { MiniProductSkeleton } from '../components/mini-product/MiniProductSkeleton';
import { getProductList } from '../api/get-product/get-product';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { SortOrder } from '../components/sort-order/SortOrder';
import { Pagination } from '../../../common/components/pagination/Pagination';
import { productSorting } from '../utils/product-sorting';

interface GlobalFeedProps {}

export const GlobalFeed: FC<GlobalFeedProps> = () => {
  // variables for sort items
  const { sortBy, activeCategory, sortOrder, currentPage } = useSelector(
    (state: RootState) => state.filter
  );
  // items
  const [allItems, setAllItems] = useState<IProduct[]>([]);
  const [items, setItems] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // search context
  const searchValue = useSelector(
    (state: RootState) => state.search.searchValue
  );

  // set all items
  useEffect(() => {
    setIsLoading(true);

    const init = async () => {
      try {
        const res = await getProductList(`pizzas?page=${currentPage}&limit=8`);
        setAllItems(res.data);
        setItems(res.data);
      } catch (e) {
        console.log('ERROR - ', e);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, [currentPage]);

  // sorting logic and get url params
  useEffect(() => {
    window.scrollTo(0, 0);

    setItems(productSorting(allItems, activeCategory, sortBy, sortOrder));
  }, [allItems, sortOrder, sortBy, activeCategory, currentPage]);

  const afterSearchFiltered = useCallback(
    (items: IProduct[]): IProduct[] => {
      return items.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    },
    [searchValue]
  );

  return (
    <div className="content">
      <Container>
        {!isLoading && (
          <div className="content__top">
            <CategoryList items={allItems} />
            <CategorySort />
            <SortOrder />
          </div>
        )}
        <h2
          className={`content__title ${
            afterSearchFiltered(items).length > 0 ? '' : 'info'
          }`}
        >
          {!isLoading && afterSearchFiltered(items).length > 0
            ? 'Усі піци'
            : 'Піца завантажується або відсутня'}
        </h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(8)].map((_, index) => (
                <MiniProductSkeleton key={index} />
              ))
            : afterSearchFiltered(items).map((pizza) => (
                <MiniProduct key={pizza.id} {...pizza} />
              ))}
          {afterSearchFiltered(items).length > 0 && <Pagination />}
        </div>
      </Container>
    </div>
  );
};
