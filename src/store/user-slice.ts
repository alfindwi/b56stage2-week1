// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { UserStoreDTO, FollowDTO } from "../features/auth/types/dto/dto"; // pastikan import ini benar
// import { apiV1 } from "../libs/api";

// const initialState: UserStoreDTO = {
//   id: 0,
//   fullName: "",
//   email: "",
//   role: "",
//   username: "",
//   bio: "",
//   image: "",
//   followeds: [],
//   followers: [],
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   socialConnection: null,
// } as UserStoreDTO;

// export const fetchUser = createAsyncThunk(
//   "users/fetchUser",
//   async (userId: number) => {
//     const response = await apiV1.get(`/users/${userId}`); // Sesuaikan endpoint sesuai kebutuhan
//     return response.data; // Pastikan data di sini mencakup followers dan followeds
//   }
// );

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setUser(state, action: PayloadAction<UserStoreDTO>) {
//       return { ...state, ...action.payload };
//     },
//     removeUser() {
//       return {} as UserStoreDTO;
//     },
//   },
// });

// export const { setUser, removeUser } = userSlice.actions;

// export default userSlice.reducer;
