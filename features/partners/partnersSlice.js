import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseurl } from "../../shared/baseURL";

export const fetchPartners = createAsyncThunk(
  "partners/fetchPartners",
  async () => {
    const response = await fetch(baseurl + "partners");
    if (!response.ok) {
      return Promise.reject("Unable to Fetch, status: " + response.status);
    }
    const data = await response.json();
    return data;
  }
);

const partnersSlice = createSlice({
  name: "partners",
  initialState: { isLoading: true, errMess: null, partnersArray: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartners.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPartners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errMess = null;
        state.partnersArray = action.payload;
      })
      .addCase(fetchPartners.rejected, (state, action) => {
        state.isLoading = false;
        state.errMess = action.error ? action.error.message : "Fetch Failed";
      });
  },
});

export const partnersReducer = partnersSlice.reducer;
