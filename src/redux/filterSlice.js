import { createSlice } from '@reduxjs/toolkit';

const sliceFilter = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filteredContact(_, action) {
      return action.payload;
    },
  },
});

export const { filteredContact } = sliceFilter.actions;
export const filtersReducer = sliceFilter.reducer;
