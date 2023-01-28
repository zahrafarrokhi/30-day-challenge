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

// retrievechat
export const retrievechat = createAsyncThunk(
  "chat/retrievechat",
  // async ({id}, thunkAPI) => { // retrievechat({id: 1})
  async (id, thunkAPI) => { // retrievechat(1)
    try {
      const response = await axios.get(`/chat-retrieve/${id}`);

      console.log(response, response.data);

      return { data: response.data };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);
// createMessage
export const createMessage = createAsyncThunk(
  "chat/createMessage",
  
  async (data, thunkAPI) => { 
    try {
      const response = await axios.post(`/message/`,{...data});

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
  chat: null,
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
  
   
   // retrievechat
   builder.addCase(retrievechat.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(retrievechat.rejected, (state, action) => ({
    ...state,
    loading: false,
    error: action.payload.error,
  }));
  builder.addCase(retrievechat.fulfilled, (state, action) => {
    state.loading = false;
    state.chat = action.payload.data
    return state;
  });

    // createMessage
    builder.addCase(createMessage.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(createMessage.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload.error,
    }));
    builder.addCase(createMessage.fulfilled, (state, action) => {
      state.loading = false;
      state.chat.messages = [...state.chat.messages,action.payload.data]
      return state;
    });


  },
});

export const { reset } = chatSlice.actions;
