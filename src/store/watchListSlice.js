import { createSlice } from "@reduxjs/toolkit";
const watchListSlice = createSlice({
  name: "watchlist",
  initialState: {
    episodes: JSON.parse(localStorage.getItem("episodes")) || [],
    episode: "",
  },
  reducers: {
    adding: (state) => {
      let episode = {
        watched: false,
        name: state.episode,
      };
      state.episodes.push(episode);
      localStorage.setItem("episodes", JSON.stringify(state.episodes));
    },
    removing: (state, action) => {
      state.episodes.splice(action.payload, 1);
      localStorage.setItem("episodes", JSON.stringify(state.episodes));
    },
    changer: (state, action) => {
      state.episode = action.payload;
    },
  },
});
export default watchListSlice.reducer;
export const watchListActions = watchListSlice.actions;
