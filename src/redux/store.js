import { configureStore } from '@reduxjs/toolkit';
import { filterSlice } from 'redux/filterSlice';
import { contactsSlice } from 'redux/contactsSlice';

export const store = configureStore({
  reducer: { phonebook: contactsSlice.reducer, filters: filterSlice.reducer },
});
