import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserStoreDTO } from "../features/auth/types/dto/dto";
import { apiV1 } from "../libs/api";
import Cookies from "js-cookie";

const initialState: UserStoreDTO = {
  id: 0,
  fullName: "",
  email: "",
  role: "",
  username: "",
  bio: "",
  image: "",
  backgroundImage: "",
} as UserStoreDTO;

export const fetchDummyUsers = createAsyncThunk(
  "users/fetchDummyUsers",
  async () => {
    const response = await apiV1.get("/users");
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserStoreDTO>) {
      return {
        ...state,
        id: action.payload.id,
        fullName: action.payload.fullName,
        email: action.payload.email,
        role: action.payload.role,
        username: action.payload.username,
        bio: action.payload.bio,
        image: action.payload.image,
        followeds: action.payload.followeds,
        backgroundImage: action.payload.backgroundImage,
        followers: action.payload.followers,
      };
    },
    updateUsers(state, action: PayloadAction<UserStoreDTO>) {
      const updatedUser = action.payload;
      state.fullName = updatedUser.fullName;
      state.username = updatedUser.username; 
      state.bio = updatedUser.bio; 
      state.email = updatedUser.email;
      state.image = updatedUser.image;
      state.backgroundImage = updatedUser.backgroundImage;
      state.followeds = updatedUser.followeds;
      state.followers = updatedUser.followers;
    },
    removeUser() {
      return {} as UserStoreDTO;
    },
    logout() {
      Cookies.remove("token"); 
      return {} as UserStoreDTO; 
    },
  },
});

export const { setUser, removeUser, updateUsers, logout } = authSlice.actions;
export default authSlice.reducer;
