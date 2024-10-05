import { configureStore } from "@reduxjs/toolkit";
import threadReducer from "./profile-slice";
import searchReducer from "./search-slice";
import authReducer from "./auth-slice";
import followsReducer from "./follows-slice";
import followingReducer from "./following-slice";
import profileReducer from "./profile-user-slice";
import likeReducer from "./threadLike-slice";
import replyReducer from "./replyLike-slice"
import suggestionReducer from "./suggestion-slice"
import userReducer from "./user-profile"

export const store = configureStore({
    reducer: {
      auth: authReducer,
      search: searchReducer,
      follows: followsReducer,
      following: followingReducer,
      thread: threadReducer,
      profile: profileReducer,
      like: likeReducer,
      reply: replyReducer,
      suggestion: suggestionReducer,
      user: userReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
