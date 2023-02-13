import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../../modules/feed/components/product/Product';

export interface ICartItem extends IProduct {
  count: number;
  type: string;
  size: number;
  totalCount: number;
}

export interface ICartState {
  items: ICartItem[];
  totalPrice: number;
  totalQuantity: number;
}

export const cartStateInitial: ICartState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
};

const productCompare = (
  first: ICartItem,
  second: ICartItem,
  differentParams: boolean = false
): boolean => {
  return (
    first.id === second.id &&
    (differentParams
      ? first.type !== second.type || first.size !== second.size
      : first.type === second.type && first.size === second.size)
  );
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: cartStateInitial,
  reducers: {
    addProduct(state, action) {
      const newItem = action.payload;
      const inList = state.items.find((item: ICartItem) =>
        productCompare(item, newItem)
      );

      if (inList) {
        ++inList.count;
        state.items.forEach((item) =>
          item.id === newItem.id ? ++item.totalCount : false
        );
      } else {
        state.items.push({
          ...newItem,
          count: 1,
          totalCount: 1,
        });

        let newTotalCount = 1;

        state.items.forEach((item) =>
          productCompare(item, newItem, true)
            ? (newTotalCount = ++item.totalCount)
            : false
        );
        state.items.forEach((item) =>
          item.id === newItem.id ? (item.totalCount = newTotalCount) : false
        );
      }

      state.totalQuantity++;
      state.totalPrice = state.items.reduce(
        (sum, obj) =>
          sum + (typeof obj.count === 'number' ? obj.count : 0) * obj.price,
        0
      );
    },
    removeItem(state, action) {
      const product = action.payload;
      const inList = state.items.find(
        (item) =>
          item.id === product.id &&
          item.size === product.size &&
          item.type === product.type
      );

      if (inList && inList.count > 1 && !product.deleteProduct) {
        --inList.count;
        --state.totalQuantity;
        state.totalPrice -= inList.price;
      } else if (inList) {
        const newQuantity = state.totalQuantity - inList.count;
        const newPrice = state.totalPrice - inList.price * inList.count;

        state.totalQuantity = newQuantity > 0 ? newQuantity : 0;
        state.totalPrice = newPrice > 0 ? newPrice : 0;
        state.items = state.items.filter((item) => item !== inList);
      }

      const itemTotalCount = inList!.totalCount - inList!.count;
      state.items.forEach((item) => {
        if (item.id === product.id) {
          item.totalCount = itemTotalCount > 0 ? itemTotalCount : 0;
        }
      });
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addProduct, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
