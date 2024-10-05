import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiV1 } from "../libs/api";

interface LikeState {
  likes: {
    [threadId: number]: {
      isLiked: boolean;
      likesCount: number;
    };
  };
  loading: boolean;
  error: string | null;
}

const initialState: LikeState = {
  likes: {},
  loading: false,
  error: null,
};

export const likeThread = createAsyncThunk(
  "likes/likeThread",
  async (threadId: number, { rejectWithValue }) => {
    try {
      const response = await apiV1.post(`/threads/${threadId}/like`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error liking thread");
    }
  }
);

export const unlikeThread = createAsyncThunk(
  "likes/unlikeThread",
  async (threadId: number, { rejectWithValue }) => {
    try {
      const response = await apiV1.delete(`/threads/${threadId}/unlike`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error unliking thread");
    }
  }
);

const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // When liking a thread
      .addCase(likeThread.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likeThread.fulfilled, (state, action) => {
        state.loading = false;
        const threadId = action.meta.arg;
        if (!state.likes[threadId]) {
          state.likes[threadId] = { isLiked: true, likesCount: 1 };
        } else {
          state.likes[threadId].isLiked = true;
          state.likes[threadId].likesCount += 1;
        }
      })
      .addCase(likeThread.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // When unliking a thread
      .addCase(unlikeThread.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unlikeThread.fulfilled, (state, action) => {
        state.loading = false;
        const threadId = action.meta.arg;
        if (state.likes[threadId]) {
          state.likes[threadId].isLiked = false;
          state.likes[threadId].likesCount -= 1;
        }
      })
      .addCase(unlikeThread.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default likesSlice.reducer;
