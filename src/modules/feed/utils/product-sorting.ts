import { IProduct } from '../components/mini-product/MiniProduct';
import { sortOrderEnum } from '../components/sort-order/SortOrder';

export const productSorting = (
  items: IProduct[],
  activeCategory: string,
  sortBy: string,
  sortOrder: sortOrderEnum
): IProduct[] => {
  let newItems: IProduct[] = items;

  if (items.length > 0) {
    if (activeCategory !== 'всі') {
      newItems = items.filter((item) => item.categoryName === activeCategory);
    } else {
      newItems = [...items];
    }

    switch (sortBy) {
      case 'популярність':
        newItems = newItems.sort((a, b) => Number(a.rating > b.rating));
        if (sortOrder === 'asc') {
          newItems.reverse();
        }
        break;
      case 'ціна':
        newItems = newItems.sort((a, b) => Number(a.price > b.price));
        if (sortOrder === 'asc') {
          newItems.reverse();
        }
        break;
      case 'алфавіт':
        newItems = newItems.sort((a, b) => Number(a.title > b.title));
        if (sortOrder === 'asc') {
          newItems.reverse();
        }
        break;
    }
  }

  return newItems;
};
