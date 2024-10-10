// store/replyLikeSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiV1 } from "../libs/api";
import Cookies from "js-cookie";

interface ReplyLikeState {
  replyLikes: {
    [replyId: number]: {
      isLiked: boolean;
      likesCount: number;
    };
  };
  loading: boolean;
  error: string | null;
}

const initialState: ReplyLikeState = {
  replyLikes: {},
  loading: false,
  error: null,
};

// Async thunk untuk toggle like pada reply
export const toggleLikeReply = createAsyncThunk(
  "replyLikes/toggleLikeReply",
  async (replyId: number, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await apiV1.post(`/replies/${replyId}/like`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return {
        replyId,
        isLiked: response.data.isLiked,
        message: response.data.message,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error toggling like");
    }
  }
);

const replyLikes = createSlice({
  name: "replyLikes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleLikeReply.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleLikeReply.fulfilled, (state, action) => {
        state.loading = false;
        const replyId = action.payload.replyId;
        const isLiked = action.payload.isLiked;

        if (!state.replyLikes[replyId]) {
          state.replyLikes[replyId] = { isLiked: false, likesCount: 0 };
        }

        if (isLiked) {
          state.replyLikes[replyId].isLiked = true;
          state.replyLikes[replyId].likesCount += 1;
        } else {
          state.replyLikes[replyId].isLiked = false;
          if (state.replyLikes[replyId].likesCount > 0) {
            state.replyLikes[replyId].likesCount -= 1;
          }
        }
      })
      .addCase(toggleLikeReply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default replyLikes.reducer;
