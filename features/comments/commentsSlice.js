import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseurl } from "../../shared/baseURL";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    const response = await fetch(baseurl + "comments");
    if (!response.ok) {
      return Promise.reject("Unable to Fetch, status: " + response.status);
    }
    const data = await response.json();
    return data;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: { isLoading: true, errMess: null, commentsArray: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errMess = null;
        state.commentsArray = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false;
        state.errMess = action.error ? action.error.message : "Fetch Failed";
      });
  },
});

export const commentsReducer = commentsSlice.reducer;
