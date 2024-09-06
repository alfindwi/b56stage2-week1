import { configureStore } from "@reduxjs/toolkit";
import followsReducer from "./follows-slice";
import searchReducer from "./search-slice";

export const store = configureStore({
    reducer: {
      search: searchReducer,
      follows: followsReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
