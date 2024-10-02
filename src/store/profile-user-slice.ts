import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ThreadEntity } from "../entities/thread"; // Pastikan path ini sesuai
import { apiV1 } from "../libs/api";

interface ThreadState {
  threads: ThreadEntity[];
  error: string | null; 
}

const initialState: ThreadState = {
  threads: [],
  error: null,
};

export const fetchThreadsProfile = createAsyncThunk(
  "thread/fetchThreadsProfile",
  async (userId: number) => {
    try {
      const response = await apiV1.get(`users/${userId}/thread`);
      console.log("API Response:", response.data); 
      return response.data; 
    } catch (error) {
      console.error("Error fetching threads:", error);
      return (error as Error).message; 
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchThreadsProfile.fulfilled, (state, action) => {
      console.log("Fetch fulfilled:", action.payload); 
      state.threads = action.payload.data.map((thread : ThreadEntity) => ({
        ...thread,
        repliesCount: thread.repliesCount ? thread.repliesCount : 0 
      }));
      state.error = null;
    })
      
  },
});

export default profileSlice.reducer;
