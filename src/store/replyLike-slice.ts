import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiV1 } from "../libs/api"; // Ganti dengan path yang sesuai untuk API


interface Reply {
  id: number;
  content: string;
  likesCount: number;
  isLikedReply: boolean; 
}


interface ReplyState {
  replies: Reply[];
  loading: boolean;
  error: string | null;
}


const initialState: ReplyState = {
  replies: [],
  loading: false,
  error: null,
};

export const fetchReplies = createAsyncThunk("replies/fetchReplies", async (threadId: number) => {
  const response = await apiV1.get(`/threads/${threadId}/replies`);
  return response.data;
});

export const likeReply = createAsyncThunk(
  "replies/likeReply",
  async (replyId: number) => {
    const response = await apiV1.post(`/replies/${replyId}/like`);
    return response.data; 
  }
);

export const unlikeReply = createAsyncThunk(
  "replies/unlikeReply",
  async (replyId: number) => {
    const response = await apiV1.delete(`/replies/${replyId}/like`);
    return response.data; 
  }
);


const replySlice = createSlice({
  name: "replies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReplies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReplies.fulfilled, (state, action) => {
        state.loading = false;
        state.replies = action.payload.map((reply: Reply) => ({
          ...reply,
          isLiked: false, 
        }));
      })
      .addCase(fetchReplies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load replies";
      })
      .addCase(likeReply.fulfilled, (state, action) => {
        const replyId = action.meta.arg;
        const reply = state.replies.find((r) => r.id === replyId);
        if (reply) {
          reply.likesCount += 1; 
          reply.isLikedReply = true;   
        }
      })
      .addCase(unlikeReply.fulfilled, (state, action) => {
        const replyId = action.meta.arg;
        const reply = state.replies.find((r) => r.id === replyId);
        if (reply) {
          reply.likesCount -= 1; 
          reply.isLikedReply = false;  
        }
      });
  },
});

export default replySlice.reducer;
