import { configureStore } from "@reduxjs/toolkit";
import followsReducer from "./follows-slice";
import threadSlice from "./profile-slice";
import searchReducer from "./search-slice";
import authReducer from "./auth-slice";

export const store = configureStore({
    reducer: {
      auth: authReducer,
      search: searchReducer,
      follows: followsReducer,
      thread: threadSlice
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
