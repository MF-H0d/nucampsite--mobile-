import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseurl } from "../../shared/baseURL";

export const fetchPromotions = createAsyncThunk(
  "promotions/fetchPromotions",
  async () => {
    const response = await fetch(baseurl + "promotions");
    if (!response.ok) {
      return Promise.reject("Unable to fetch, status: " + response.status);
    }
    const data = await response.json();
    return data;
  }
);

const promotionsSlice = createSlice({
  name: "promotions",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromotions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPromotions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errMess = null;
        state.promotionsArray = action.payload;
      })
      .addCase(fetchPromotions.rejected, (state, action) => {
        state.isLoading = false;
        state.errMess = action.error ? action.error.message : "Fetch Failed";
      });
  },
});

export const promotionsReducer = promotionsSlice.reducer;
