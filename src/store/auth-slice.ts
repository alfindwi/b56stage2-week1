import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserStoreDTO } from "../features/auth/types/dto/dto";
import { apiV1 } from "../libs/api";

const initialState: UserStoreDTO = {} as UserStoreDTO;

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
      };
    },
    removeUser() {
      return {} as UserStoreDTO;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDummyUsers.fulfilled, (state, action) => {
      return {
        ...state,
        test: action.payload,
      };
    });
  },
});

export const { setUser, removeUser } = authSlice.actions;

export default authSlice.reducer;