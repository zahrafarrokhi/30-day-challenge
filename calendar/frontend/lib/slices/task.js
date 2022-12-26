import { StarSharp } from "@mui/icons-material";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
// listTask
export const listTask = createAsyncThunk(
  "task/list",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`/task/task/`, {
        params: {
          // if data = { date }
          // date__date__exact: data.date
          // or
          // if data = { date__date__exact }
          ...data,
        },
      });

      console.log(response, response.data);

      return { data: response.data };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);

// createTask
export const createTask = createAsyncThunk(
  "task/create",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`/task/task/`, { ...data });

      console.log(response, response.data);

      return { data: response.data }; // action.paylod.data =>  data: response.data
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);
// updateTask
export const updateTask = createAsyncThunk(
  "task/update",
  async ({ id, ...data }, thunkAPI) => {
    try {
      const response = await axios.patch(`/task/task/${id}/`, { ...data });

      console.log(response, response.data);

      return { data: response.data };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);

// listDays
export const listDays = createAsyncThunk(
  "task/list-days",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`/task/days/`);

      console.log(response, response.data);

      return { data: response.data };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);

const internalInitialState = {
  tasks: [],
  days: [],
  task: null,
  error: null,
  loading: false, // false ,not busy
};

export const taskSlice = createSlice({
  name: "task",
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
    // createTask
    builder.addCase(createTask.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(createTask.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload.error,
    }));
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = [...state.tasks, action.payload.data];

      return state;
    });

    // updateTask
    builder.addCase(updateTask.pending, (state) => ({
      ...state,
      // loading: true,
    }));
    builder.addCase(updateTask.rejected, (state, action) => ({
      ...state,
      // loading: false,
      error: action.payload.error,
    }));
    builder.addCase(updateTask.fulfilled, (state, action) => {
      // state.loading = false;
      state.tasks = [
        ...state.tasks.filter((item) => item.id != action.payload.data.id),
        action.payload.data,
      ].sort((a, b) => a.id - b.id);

      return state;
    });

    // listDays
    builder.addCase(listDays.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(listDays.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload.error,
    }));
    builder.addCase(listDays.fulfilled, (state, action) => {
      state.loading = false;
      state.days = action.payload.data;

      return state;
    });
  },
});

export const { reset } = taskSlice.actions;
