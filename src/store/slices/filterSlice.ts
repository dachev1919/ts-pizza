import { createSlice } from '@reduxjs/toolkit';
import { sortOrderEnum } from '../../modules/feed/components/sort-order/SortOrder';

export interface IProductFilterState {
  activeCategory: string;
  sortBy: string;
  sortOrder: sortOrderEnum;
  currentPage: number;
}

export const filterStateInitial: IProductFilterState = {
  activeCategory: 'всі',
  sortBy: 'популярність',
  sortOrder: sortOrderEnum.desc,
  currentPage: 1,
};

export const productFilterSlice = createSlice({
  name: 'filters',
  initialState: filterStateInitial,
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
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { setActiveCategory, setSortOrder, setSortBy, setCurrentPage } =
  productFilterSlice.actions;

export default productFilterSlice.reducer;
