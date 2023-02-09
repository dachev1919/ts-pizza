import { IProduct } from '../components/product/Product';
import { ISortList } from '../components/category-sort/CategorySort';
import { sortOrderEnum } from '../components/sort-order/SortOrder';

export const productSorting = (
  items: IProduct[],
  activeCategory: string,
  sortBy: ISortList,
  sortOrder: sortOrderEnum
): IProduct[] => {
  let newItems: IProduct[] = items;

  if (items.length > 0) {
    if (activeCategory !== '') {
      newItems = items.filter((item) => item.categoryName === activeCategory);
    } else {
      newItems = [...items];
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
  }

  return newItems;
};
