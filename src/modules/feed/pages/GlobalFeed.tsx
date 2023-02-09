import { FC, useContext, useEffect, useState } from 'react';
import { CategoryList } from '../components/category-list/CategoryList';
import { CategorySort } from '../components/category-sort/CategorySort';
import { IProduct, Product } from '../components/product/Product';
import { Container } from '../../../common/components/container/Container';
import { ProductSkeleton } from '../components/product/ProductSkeleton';
import { getProductList } from '../components/api/get-product/get-product';
import SearchContext from '../../../common/components/UI/search/Search';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { SortOrder } from '../components/sort-order/SortOrder';
import { Pagination } from '../../../common/components/pagination/Pagination';
import { productSorting } from '../utils/product-sorting';

interface GlobalFeedProps {}

export const GlobalFeed: FC<GlobalFeedProps> = () => {
  // items and loading items
  const [allItems, setAllItems] = useState<IProduct[]>([]);
  const [items, setItems] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // variables for sort items
  const { sortBy, activeCategory, sortOrder } = useSelector(
    (state: RootState) => state.filter
  );

  // pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  // search context
  const { searchValue } = useContext(SearchContext);

  // sorting logic
  useEffect(() => {
    setItems(productSorting(allItems, activeCategory, sortBy, sortOrder));
  }, [allItems, sortOrder, sortBy, activeCategory]);

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
          {afterSearchFiltered(items).length > 0 && (
            <Pagination setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Container>
    </div>
  );
};
