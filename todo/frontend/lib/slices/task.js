

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios'
// create
export const create = createAsyncThunk(
  'task/create',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`/task/tasks/`,{...data});

      console.log(response, response.data);

      return { data: response.data };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);
// list
export const listTasks = createAsyncThunk(
  'task/list',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/task/tasks/`);

      console.log(response, response.data);

      return { data: response.data };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);
// delete
export const deleteTasks = createAsyncThunk(
  'task/del',
  async ({id}, thunkAPI) => {
    try {
      const response = await axios.delete(`/task/tasks/${id}`);

      console.log(response, response.data);
      // Because response has no data when action is delete in django
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
  'task/up',
  async ({id, ...data}, thunkAPI) => {
    try {
      const response = await axios.patch(`/task/tasks/${id}/`,{...data});

      console.log(response, response.data);
      return { data: response.data }; // => action.payload = { data: response.data } => action.payload.data.id
      // return response.data // => action.payload = response.data => action.payload.id
      // return response // => action.payload = response => action.payload.data.id
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);


const internalInitialState = {
  tasks :[],
  task : null,
  error: null,
  loading: false, // false ,not busy
};

export const taskSlice = createSlice({
  name: 'task',
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
       // create
builder.addCase(create .pending, (state) => ({
  ...state,
  loading: true,
}));
builder.addCase(create .rejected, (state, action) => ({
  ...state,
  loading: false,
  error: action.payload.error,
}));
builder.addCase(create .fulfilled, (state, action) => {
  state.loading = false; 
  // 
  state.tasks = [...state.tasks,action.payload.data]
  
  return state;
});

    // listTasks
builder.addCase(listTasks .pending, (state) => ({
  ...state,
  loading: true,
}));
builder.addCase(listTasks .rejected, (state, action) => ({
  ...state,
  loading: false,
  error: action.payload.error,
}));
builder.addCase(listTasks .fulfilled, (state, action) => {
  state.loading = false; 
  state.tasks = action.payload.data
  
  return state;
});

    // deleteTasks
    builder.addCase(deleteTasks .pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(deleteTasks .rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload.error,
    }));
    builder.addCase(deleteTasks .fulfilled, (state, action) => {
      state.loading = false; 
      // delete
      state.tasks = state.tasks.filter(t=>t.id!==action.payload.id)
      
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
    // state.tasks =[...state.tasks.filter(t=>t.id!==action.payload.data.id), action.payload.data] 1.delete 2.add to end of list
    // sort with id
    state.tasks =[...state.tasks.filter(t=>t.id!==action.payload.data.id), action.payload.data].sort((a,b)=>a.id-b.id) 
    // sort with done ,incomplete
    // state.tasks =[...state.tasks.filter(t=>t.id!==action.payload.data.id), action.payload.data].sort((a, b) => {
    //   if(a.status == 'done') {
    //     return 1
    //   }
    //   return -1
    // })
    return state;
  });
} 
});

// export const { reset} = taskSlice.actions;