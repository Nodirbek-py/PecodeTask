import { configureStore } from "@reduxjs/toolkit";
import characterSlice from "./characterSlice";
import episodeSlice from "./episodeSlice";
import locationSlice from "./locationSlice";
import watchListSlice from "./watchListSlice";
const store = configureStore({
  reducer: {
    characterSlice,
    episodeSlice,
    locationSlice,
    watchListSlice,
  },
});
export default store;
