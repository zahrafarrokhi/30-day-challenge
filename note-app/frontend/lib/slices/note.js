

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios'
// createNote
export const createNote = createAsyncThunk(
  'note/create',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`/note/notes/`,{...data});

      console.log(response, response.data);

      return { data: response.data };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);
// listNotes
export const listNotes = createAsyncThunk(
  'note/list',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/note/notes/`, { params: _ });

      console.log(response, response.data);

      return { data: response.data };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);

// delete
export const deleteNotes = createAsyncThunk(
  'note/delete',
  async ({id}, thunkAPI) => {
    try {
      const response = await axios.delete(`/note/notes/${id}`);

      console.log(response, response.data);
//  return => id
      return { id };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);
// update
export const update = createAsyncThunk(
  'note/update',
  async ({id, ...data}, thunkAPI) => {
    try {
      const response = await axios.patch(`/note/notes/${id}/`,{...data});

      console.log(response, response.data);
      return { data: response.data };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);

const internalInitialState = {
  notes :[],
  note : null,
  error: null,
  loading: false, // false ,not busy
};

export const noteSlice = createSlice({
  name: 'note',
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
       // create
builder.addCase(createNote .pending, (state) => ({
  ...state,
  loading: true,
}));
builder.addCase(createNote .rejected, (state, action) => ({
  ...state,
  loading: false,
  error: action.payload.error,
}));
builder.addCase(createNote .fulfilled, (state, action) => {
  state.loading = false; 
  // prevoius list up to date
  state.notes = [...state.notes,action.payload.data]
  
  return state;
});

    // listNotes
builder.addCase(listNotes .pending, (state) => ({
  ...state,
  loading: true,
}));
builder.addCase(listNotes .rejected, (state, action) => ({
  ...state,
  loading: false,
  error: action.payload.error,
}));
builder.addCase(listNotes .fulfilled, (state, action) => {
  state.loading = false; 
  state.notes = action.payload.data
  
  return state;
});

// deleteNotes
builder.addCase(deleteNotes .pending, (state) => ({
  ...state,
  loading: true,
}));
builder.addCase(deleteNotes .rejected, (state, action) => ({
  ...state,
  loading: false,
  error: action.payload.error,
}));
builder.addCase(deleteNotes .fulfilled, (state, action) => {
  state.loading = false; 
  // delete
  state.notes = state.notes.filter(t=>t.id!==action.payload.id)
  
  return state;
});  

  // update
  builder.addCase(update .pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(update .rejected, (state, action) => ({
    ...state,
    loading: false,
    error: action.payload.error,
  }));
  builder.addCase(update .fulfilled, (state, action) => {
    state.loading = false; 
    // up
    // state.notes =[...state.notes.filter(t=>t.id!==action.payload.data.id), action.payload.data] 1.delete 2.add to end of list
    // sort with id
    state.notes =[...state.notes.filter(t=>t.id!==action.payload.data.id), action.payload.data].sort((a,b)=>a.id-b.id) 
   
    return state;
  });





} 
});

// export const { reset} = noteSlice.actions;