import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const api = async (page) => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );
  return response.json();
};
export const getCharacter = createAsyncThunk(
  "character/getCharacter",
  async (page) => {
    const data = await api(page);
    return data;
  }
);
const characterSlice = createSlice({
  name: "character",
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
    [getCharacter.pending]: (state) => {
      state.status = "pending";
    },
    [getCharacter.fulfilled]: (state, action) => {
      state.status = "success";
      state.posts = action.payload;
    },
    [getCharacter.rejected]: (state) => {
      state.status = "rejected";
    },
  },
});
export default characterSlice.reducer;
export const characterActions = characterSlice.actions;
