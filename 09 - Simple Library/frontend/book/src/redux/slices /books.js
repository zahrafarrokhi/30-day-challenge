import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const IDLE = 'idle';
export const LOADING = 'loading';

export const loadBooks = createAsyncThunk(
  'books/list',
  async (payload, thunkAPI) => {

    try {
      const response = await axios.get(`http://localhost:8000/api/books/book`,{params:payload});

      console.log(response, response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  },
);


export const categoryBooks = createAsyncThunk(
  'books/categories',
  async (payload, thunkAPI) => {

    try {
      const response = await axios.get(`http://localhost:8000/api/books/category`);

      console.log(response, response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  },
);

export const authorBooks = createAsyncThunk(
  'books/authors',
  async (payload, thunkAPI) => {

    try {
      const response = await axios.get(`http://localhost:8000/api/authors/author`);

      console.log(response, response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  },
);
export const filterBooks = createAsyncThunk(
  'books/filter',
  async (payload, thunkAPI) => {

    try {
      const response = await axios.get(`http://localhost:8000/api/books/filter-values`);

      console.log(response, response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  },
);

const internalInitialState = {
  books: [],
  book: null,
  page_numbers:{},
  categories:[],
  authors:[],
  count:0,
  error: null,
  loading: IDLE, // false ,not busy
};

export const bookSlice = createSlice({
  name: 'book',
  initialState: internalInitialState,
  reducers: {

  
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    // loadbooks
    builder.addCase(loadBooks.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(loadBooks.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(loadBooks.fulfilled, (state, action) => {
      state.loading = IDLE;
      //total data => action.payload.data
      //up => {...respose.data } or response.data => action.payload
      state.books = action.payload.results;
      state.count = action.payload.count;
      return state;
    });

     // categoryBooks
         builder.addCase(categoryBooks.pending, (state) => ({
          ...state,
          loading: LOADING,
        }));
        builder.addCase(categoryBooks.rejected, (state, action) => ({
          ...state,
          loading: IDLE,
          error: action.payload.error,
        }));
        builder.addCase(categoryBooks.fulfilled, (state, action) => {
          state.loading = IDLE;
        
          state.categories = action.payload;
          
          return state;
        });
         // categoryBooks
         builder.addCase(authorBooks.pending, (state) => ({
          ...state,
          loading: LOADING,
        }));
        builder.addCase(authorBooks.rejected, (state, action) => ({
          ...state,
          loading: IDLE,
          error: action.payload.error,
        }));
        builder.addCase(authorBooks.fulfilled, (state, action) => {
          state.loading = IDLE;
        
          state.authors = action.payload;
          
          return state;
        });
     // filterBooks
     builder.addCase(filterBooks.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(filterBooks.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(filterBooks.fulfilled, (state, action) => {
      state.loading = IDLE;
      //total data => action.payload.data
      //up => {...respose.data } or response.data => action.payload
      state.page_numbers = action.payload;
      
      return state;
    });


  },
});

export const { reset,} = bookSlice.actions;