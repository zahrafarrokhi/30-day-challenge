import { StarSharp } from "@mui/icons-material";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
// listTask
export const listTask = createAsyncThunk(
  "auth/create",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`/task/task/`);

      console.log(response, response.data);

      return { data: response.data };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);


// // refresh
// export const refresh = createAsyncThunk(
//   "auth/login",
//   async (data, thunkAPI) => {
//     try {
//       const response = await axios.post(`/auth/refresh/`, { ...data });

//       console.log(response, response.data);

//       return { data: response.data };
//     } catch (error) {
//       console.log(error);
//       return thunkAPI.rejectWithValue({ error: error.response.data });
//     }
//   }
// );

const internalInitialState = {
  tasks: [],
  task: null,
  error: null,
  loading: false, // false ,not busy
};

export const taskSlice = createSlice({
  name: "auth",
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    // listTask
    builder.addCase(listTask.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(listTask.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload.error,
    }));
    builder.addCase(listTask.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload.data;

      return state;
    });

  //   // login
  //   builder.addCase(login.pending, (state) => ({
  //     ...state,
  //     loading: true,
  //   }));
  //   builder.addCase(login.rejected, (state, action) => ({
  //     ...state,
  //     loading: false,
  //     error: action.payload.error,
  //   }));
  //   builder.addCase(login.fulfilled, (state, action) => {
  //     state.loading = false;
  //     state.refresh = action.payload.data.refresh;
  //     state.access = action.payload.data.access;
      
  //     axios.defaults.headers.common.Authorization = `Bearer ${state.access}`
  //     return state;
  //   });
  },
});
