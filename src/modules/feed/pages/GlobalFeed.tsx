import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { CategoryList } from '../components/category-list/CategoryList';
import { CategorySort } from '../components/category-sort/CategorySort';
import { IProduct, Product } from '../components/product/Product';
import { Container } from '../../../common/components/container/Container';
import { ProductSkeleton } from '../components/product/ProductSkeleton';
import { getProductList } from '../api/get-product/get-product';
import SearchContext from '../../../common/components/UI/search/Search';
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
  const { searchValue } = useContext(SearchContext);

  // set all items
  useEffect(() => {
    setIsLoading(true);

    getProductList(`pizzas?page=${currentPage}&limit=8`).then((response) => {
      setAllItems(response.data);
      setItems(response.data);
      setIsLoading(false);
    });
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
        <div className="content__top">
          {!isLoading && (
            <>
              <CategoryList items={allItems} />
              <CategorySort />
              <SortOrder />
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
          {afterSearchFiltered(items).length > 0 && <Pagination />}
        </div>
      </Container>
    </div>
  );
};
