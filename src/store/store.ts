import { configureStore } from "@reduxjs/toolkit";
import threadReducer from "./profile-slice";
import searchReducer from "./search-slice";
import authReducer from "./auth-slice";
import followsReducer from "./follows-slice";
import followingReducer from "./following-slice";

export const store = configureStore({
    reducer: {
      auth: authReducer,
      search: searchReducer,
      follows: followsReducer,
      following: followingReducer,
      thread: threadReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
