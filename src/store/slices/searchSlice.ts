import { createSlice } from '@reduxjs/toolkit';

export interface ISearchState {
  searchValue: string;
}

export const searchStateInitial: ISearchState = {
  searchValue: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState: searchStateInitial,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export const { setSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
