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

// Thunk untuk mengambil threads berdasarkan userId
export const fetchThreadsByUserId = createAsyncThunk(
  "thread/fetchByUserId",
  async (userId: number) => {
    try {
      const response = await apiV1.get(`users/${userId}/thread`);
      console.log("API Response:", response.data); // Tambahkan log ini
      return response.data; // Mengembalikan respons lengkap
    } catch (error) {
      console.error("Error fetching threads:", error);
      return (error as Error).message; // Mengembalikan pesan error
    }
  }
);

// Slice untuk state threads
const threadSlice = createSlice({
  name: "thread",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchThreadsByUserId.fulfilled, (state, action) => {
      console.log("Fetch fulfilled:", action.payload); 
      state.threads = action.payload.data.map((thread : ThreadEntity) => ({
        ...thread,
        repliesCount: thread.repliesCount ? thread.repliesCount : 0 
      }));
      state.error = null;
    })
      
  },
});

export default threadSlice.reducer;
