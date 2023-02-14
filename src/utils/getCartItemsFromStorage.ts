import { ICartItem } from '../store/slices/cartSlice';
import { calcTotalPrice } from './calcTotalPrice';

export const getCartItemsFromStorage = () => {
  const data: string | null = localStorage.getItem('cartItems');
  let objectTotalPrice: number = 0;
  let objectItems: ICartItem[] = [];
  let objectTotalQuantity: number = 0;

  if (data) {
    objectItems = JSON.parse(data);
    if (objectItems) {
      objectTotalPrice = calcTotalPrice(objectItems);
      objectTotalQuantity = objectItems.reduce(
        (sum, item) => item.totalCount + sum,
        0
      );
    }
  }

  return {
    items: objectItems,
    totalPrice: objectTotalPrice,
    totalQuantity: objectTotalQuantity,
  };
};
