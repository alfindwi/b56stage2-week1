import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiV1 } from "../libs/api";
import Cookies from "js-cookie";

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

export const toggleLikeThread = createAsyncThunk(
  "likes/toggleLikeThread",
  async (threadId: number, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await apiV1.post(`/threads/${threadId}/like`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return {
        threadId,
        isLiked: response.data.isLiked,
        message: response.data.message,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error toggling like");
    }
  }
);



const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleLikeThread.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleLikeThread.fulfilled, (state, action) => {
        state.loading = false;
        const threadId = action.payload.threadId;
        const isLiked = action.payload.isLiked;

        if (!state.likes[threadId]) {
          state.likes[threadId] = { isLiked: false, likesCount: 0 };
        }

        if (isLiked) {
          state.likes[threadId].isLiked = true;
          state.likes[threadId].likesCount += 1;
        } else {
          state.likes[threadId].isLiked = false;
          if (state.likes[threadId].likesCount > 0) {
            state.likes[threadId].likesCount -= 1;
          }
        }
      })
      .addCase(toggleLikeThread.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});


export default likesSlice.reducer;
