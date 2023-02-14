import { FC, useCallback, useEffect, useState } from 'react';
import { CategoryList } from '../components/category-list/CategoryList';
import { CategorySort } from '../components/category-sort/CategorySort';
import { IProduct, MiniProduct } from '../components/mini-product/MiniProduct';
import { Container } from '../../../common/components/container/Container';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { SortOrder } from '../components/sort-order/SortOrder';
import { Pagination } from '../../../common/components/pagination/Pagination';
import { productSorting } from '../utils/product-sorting';
import { useGetProductsByPermalinkQuery } from '../../../store/slices/apiSlice';
import { ProductsLoading } from '../components/products-loading/PropuctsLoading';
import { LoadingError } from '../../../common/components/UI/loading-error/LoadingError';

interface GlobalFeedProps {}

export const GlobalFeed: FC<GlobalFeedProps> = () => {
  // variables for sort items
  const { sortBy, activeCategory, sortOrder, currentPage } = useSelector(
    (state: RootState) => state.filter
  );
  const {
    data: allItems,
    isLoading,
    isError,
  } = useGetProductsByPermalinkQuery(`pizzas?page=${currentPage}&limit=8`);
  // items
  const [items, setItems] = useState<IProduct[]>([]);
  const searchValue = useSelector(
    (state: RootState) => state.search.searchValue
  );

  // set all items
  useEffect(() => {
    if (allItems) {
      setItems(allItems);
    }
  }, [allItems]);

  // sorting logic and get url params
  useEffect(() => {
    window.scrollTo(0, 0);

    if (allItems) {
      setItems(productSorting(allItems, activeCategory, sortBy, sortOrder));
    }
  }, [allItems, sortOrder, sortBy, activeCategory, currentPage]);

  const afterSearchFiltered = useCallback(
    (items: IProduct[]): IProduct[] => {
      return items.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    },
    [searchValue]
  );

  if (isLoading) {
    return <ProductsLoading />;
  }

  if (isError || !allItems) {
    return <LoadingError />;
  }

  return (
    <div className="content">
      <Container>
        <div className="content__top">
          <CategoryList items={allItems} />
          <CategorySort />
          <SortOrder />
        </div>
        <h2 className="content__title">Усі піци</h2>
        <div className="content__items">
          {afterSearchFiltered(items).length > 0 &&
            afterSearchFiltered(items).map((pizza) => (
              <MiniProduct key={pizza.id} {...pizza} />
            ))}
          {afterSearchFiltered(items).length > 0 && <Pagination />}
        </div>
      </Container>
    </div>
  );
};
