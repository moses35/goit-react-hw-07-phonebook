import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getContacts,
  createContact,
  deleteContacts,
} from 'services/contactsApi';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      return await getContacts();
    } catch (e) {
      return thunkAPI.rejectWithValue('Request error');
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (data, thunkAPI) => {
    try {
      return await createContact(data);
    } catch (e) {
      return thunkAPI.rejectWithValue('Request error');
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      return await deleteContacts(id);
    } catch (e) {
      return thunkAPI.rejectWithValue('Request error');
    }
  }
);
