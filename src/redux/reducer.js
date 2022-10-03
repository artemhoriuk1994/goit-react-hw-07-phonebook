import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const sliceContacts = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    addContact(state, action) {
      state.push({
        name: action.payload.name,
        number: action.payload.number,
        id: nanoid(),
      });
    },

    deleteContact(state, action) {
      return state.filter(contact => contact.id !== action.payload);
    },
  },
});

const sliceFilter = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filteredContact(state, action) {
      return action.payload;
    },
  },
});

export const { filteredContact } = sliceFilter.actions;
export const { addContact, deleteContact } = sliceContacts.actions;

export const contactReducer = sliceContacts.reducer;
export const filtersReducer = sliceFilter.reducer;
