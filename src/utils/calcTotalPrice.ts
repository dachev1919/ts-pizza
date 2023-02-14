import { ICartItem } from '../store/slices/cartSlice';

export const calcTotalPrice = (items: ICartItem[]): number => {
  return items.reduce(
    (sum, item) =>
      sum + (typeof item.count === 'number' ? item.count : 0) * item.price,
    0
  );
};
