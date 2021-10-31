import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const api = async (page) => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/location?page=${page}`
  );
  return response.json();
};
export const getLocations = createAsyncThunk(
  "location/getlocations",
  async (page) => {
    const data = await api(page);
    return data;
  }
);
const locationSlice = createSlice({
  name: "location",
  initialState: {
    posts: [],
    page: 1,
    status: "",
  },
  reducers: {
    prev: (state) => {
      state.page -= 1;
    },
    next: (state) => {
      state.page += 1;
    },
    filter: (state, action) => {
      state.posts.results = state.posts.results.sort((a, b) =>
        a[action.payload] > b[action.payload]
          ? 1
          : b[action.payload] > a[action.payload]
          ? -1
          : 0
      );
    },
  },
  extraReducers: {
    [getLocations.pending]: (state) => {
      state.status = "pending";
    },
    [getLocations.fulfilled]: (state, action) => {
      state.status = "success";
      state.posts = action.payload;
    },
    [getLocations.rejected]: (state) => {
      state.status = "rejected";
    },
  },
});
export default locationSlice.reducer;
export const locationActions = locationSlice.actions;
