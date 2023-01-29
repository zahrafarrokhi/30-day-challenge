import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
// getOtp
export const login = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`/auth/login/`, { ...data });

      console.log(response, response.data);

      return { data: response.data };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);

// signup
export const signup = createAsyncThunk(
  "auth/create",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`/auth/signup/`, { ...data });

      console.log(response, response.data);

      return { data: response.data };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);
// login
// request to back for get accsess &refrsh
export const confirm = createAsyncThunk("auth/confirm", async (data, thunkAPI) => {
  try {
    // response backend => access & refresh in body
    const response = await axios.post(`/auth/confirm/`, { ...data });

    console.log(response, response.data);

    return { data: response.data };
    // data
    // {
    //   "access":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3BrIjoxLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiY29sZF9zdHVmZiI6IuKYgyIsImV4cCI6MTIzNDU2LCJqdGkiOiJmZDJmOWQ1ZTFhN2M0MmU4OTQ5MzVlMzYyYmNhOGJjYSJ9.NHlztMGER7UADHZJlxNG0WSi22a2KaYSfd1S-AuT7lU",
    //   "refresh":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3BrIjoxLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImNvbGRfc3R1ZmYiOiLimIMiLCJleHAiOjIzNDU2NywianRpIjoiZGUxMmY0ZTY3MDY4NDI3ODg5ZjE1YWMyNzcwZGEwNTEifQ.aEoAYkSJjoWH1boshQAaTkf8G3yn0kapko6HFRt7Rh4"
    // }
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue({ error: error.response.data });
  }
});


const internalInitialState = {
  refresh: null,
  access: null,
  error: null,
  loading: false, // false ,not busy
};

export const authSlice = createSlice({
  name: "auth",
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    // getOtp
    builder.addCase(login.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(login.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload.error,
    }));
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.phone_number = action.payload.data.phone_number
      return state;
    });
    // signup
    builder.addCase(signup.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(signup.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload.error,
    }));
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      state.phone_number = action.payload.data.phone_number
      return state;
    });

    // login
    builder.addCase(confirm.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(confirm.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload.error,
    }));
    builder.addCase(confirm.fulfilled, (state, action) => {
      state.loading = false;
      state.refresh = action.payload.data.refresh;
      state.access = action.payload.data.access;
      state.user = action.payload.data.user;

      axios.defaults.headers.common.Authorization = `Bearer ${state.access}`;
      return state;
    });
  },
});

export const { reset } = authSlice.actions;
