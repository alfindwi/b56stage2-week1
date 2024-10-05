import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ThreadEntity } from "../entities/thread"; // Pastikan path ini sesuai
import { apiV1 } from "../libs/api";

// State interface untuk Profile
interface ProfileState {
  threads: ThreadEntity[];
  selectedUser: any; // Sesuaikan dengan tipe user jika ada interface user
  error: string | null;
}

const initialState: ProfileState = {
  threads: [],
  selectedUser: null,
  error: null,
};

// Thunk untuk fetch threads berdasarkan userId
export const fetchThreadsProfile = createAsyncThunk(
  "profile/fetchThreadsProfile",
  async (userId: number) => {
    try {
      const response = await apiV1.get(`users/${userId}/thread`);
      console.log("API Response (Threads):", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching threads:", error);
      return (error as Error).message;
    }
  }
);

// Thunk untuk fetch selected user berdasarkan userId
export const fetchSelectedUser = createAsyncThunk(
  "profile/fetchSelectedUser",
  async (userId: number) => {
    try {
      const response = await apiV1.get(`/users/${userId}`);
      console.log("API Response (Selected User):", response.data);
      return response.data; // Mengembalikan data user dari API
    } catch (error) {
      console.error("Error fetching selected user:", error);
      return (error as Error).message;
    }
  }
);

// Slice untuk profile yang mengelola state threads dan selectedUser
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Case untuk threads
    builder.addCase(fetchThreadsProfile.fulfilled, (state, action) => {
      console.log("Fetch fulfilled (Threads):", action.payload);
      state.threads = action.payload.data.map((thread: ThreadEntity) => ({
        ...thread,
      }));
      state.error = null;
    });

    // Case untuk selected user
    builder.addCase(fetchSelectedUser.fulfilled, (state, action) => {
      console.log("Fetch fulfilled (Selected User):", action.payload);
      state.selectedUser = action.payload.data;
      state.error = null;
    });

    // Case jika fetching gagal
    builder.addCase(fetchSelectedUser.rejected, (state, action) => {
      state.error = action.error.message || "Failed to fetch selected user";
    });
  },
});

export default profileSlice.reducer;
