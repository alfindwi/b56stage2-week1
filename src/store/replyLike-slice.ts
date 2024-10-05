import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiV1 } from "../libs/api"; 
import Cookies from "js-cookie";

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

// Fetching replies for a thread
export const fetchReplies = createAsyncThunk("replies/fetchReplies", async (threadId: number) => {
  const response = await apiV1.get(`/threads/${threadId}/replies`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    }
  });
  return response.data;
});

// Like a reply
export const likeReply = createAsyncThunk(
  "replies/likeReply",
  async (replyId: number) => {
    const response = await apiV1.post(`/replies/${replyId}/like`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return response.data; 
  }
);

// Unlike a reply
export const unlikeReply = createAsyncThunk(
  "replies/unlikeReply",
  async (replyId: number) => {
    const response = await apiV1.delete(`/replies/${replyId}/like`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return response.data; 
  }
);

const replySlice = createSlice({
  name: "replies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetching replies
      .addCase(fetchReplies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReplies.fulfilled, (state, action) => {
        state.loading = false;
        state.replies = action.payload.map((reply: Reply) => ({
          ...reply,
          isLikedReply: false, // Initialize isLikedReply to false
        }));
      })
      .addCase(fetchReplies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load replies";
      })

      // Liking a reply
      .addCase(likeReply.fulfilled, (state, action) => {
        const replyId = action.meta.arg; // Get replyId from the thunk argument
        const reply = state.replies.find((r) => r.id === replyId); // Find the reply in state
        if (reply) {
          reply.likesCount += 1; // Increment the like count
          reply.isLikedReply = true; // Set isLikedReply to true
        }
      })

      // Unliking a reply
      .addCase(unlikeReply.fulfilled, (state, action) => {
        const replyId = action.meta.arg; // Get replyId from the thunk argument
        const reply = state.replies.find((r) => r.id === replyId); // Find the reply in state
        if (reply) {
          reply.likesCount -= 1; // Decrement the like count
          reply.isLikedReply = false; // Set isLikedReply to false
        }
      });
  },
});

export default replySlice.reducer;
