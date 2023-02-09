import { createSlice } from '@reduxjs/toolkit';
import { ISortList } from '../../modules/feed/components/category-sort/CategorySort';
import { sortOrderEnum } from '../../modules/feed/components/sort-order/SortOrder';

export interface IProductFilterState {
  activeCategory: string;
  sortBy: ISortList;
  sortOrder: sortOrderEnum;
}

const initialState: IProductFilterState = {
  activeCategory: '',
  sortBy: { name: 'популярність', sortBy: 'rating' },
  sortOrder: sortOrderEnum.desc,
};

export const productFilterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
    setSortOrder(state, action) {
      state.sortOrder = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
  },
});

export const { setActiveCategory, setSortOrder, setSortBy } =
  productFilterSlice.actions;

export default productFilterSlice.reducer;
