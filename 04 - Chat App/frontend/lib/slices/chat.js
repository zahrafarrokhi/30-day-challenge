import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
// chatlist
export const chatlist = createAsyncThunk(
  "chat/chatlist",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`/chat/`);

      console.log(response, response.data);

      return { data: response.data };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);




const internalInitialState = {
  chats:[],
  error: null,
  loading: false, // false ,not busy
};

export const chatSlice = createSlice({
  name: "chat",
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    // chatlist
    builder.addCase(chatlist.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(chatlist.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload.error,
    }));
    builder.addCase(chatlist.fulfilled, (state, action) => {
      state.loading = false;
      state.chats = action.payload.data
      return state;
    });
  
   
   
  },
});

export const { reset } = chatSlice.actions;
