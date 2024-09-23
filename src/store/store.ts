import { configureStore } from "@reduxjs/toolkit";
import followsReducer from "./follows-slice";
import profileReducer from "./profile-slice";
import searchReducer from "./search-slice";
import authReducer from "./auth-slice";

export const store = configureStore({
    reducer: {
      auth: authReducer,
      profile: profileReducer,
      search: searchReducer,
      follows: followsReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
