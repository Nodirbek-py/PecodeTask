import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const api = async (page) => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/episode?page=${page}`
  );
  return response.json();
};
export const getEpisodes = createAsyncThunk(
  "episode/getEpisodes",
  async (page) => {
    const data = await api(page);
    return data;
  }
);
const episodeSlice = createSlice({
  name: "episode",
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
    [getEpisodes.pending]: (state) => {
      state.status = "pending";
    },
    [getEpisodes.fulfilled]: (state, action) => {
      state.status = "success";
      state.posts = action.payload;
    },
    [getEpisodes.rejected]: (state) => {
      state.status = "rejected";
    },
  },
});
export default episodeSlice.reducer;
export const episodeActions = episodeSlice.actions;
