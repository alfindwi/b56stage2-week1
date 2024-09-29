import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FollowingEntity } from "../entities/follow"; // Pastikan ini sudah benar
import { apiV1 } from "../libs/api";

// Defining the following state structure
interface FollowingState {
  following: FollowingEntity[]; 
  loading: boolean;
  error: string | null;
}

const initialState: FollowingState = {
  following: [],
  loading: false,
  error: null,
};

export const fetchFollowing = createAsyncThunk(
  "followers/fetchFollowing",
  async () => {
    const response = await apiV1.get("/following");
    console.log("API Response data:", response.data);

    return response.data.map((follow: any) => ({
      id: follow.id,
      followerId: follow.followerId,
      followingId: follow.followingId,
      following: follow.following, 
      isFollowing: follow.isFollowing, 
    }));
  }
);

const followingSlice = createSlice({
  name: "following",
  initialState,
  reducers: {
    clearFollowing(state) {
      state.following = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFollowing.fulfilled, (state, action: PayloadAction<FollowingEntity[]>) => {
        state.following = action.payload; 
        state.loading = false;
      })
      .addCase(fetchFollowing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; 
      });
  },
});

export const { clearFollowing } = followingSlice.actions;
export default followingSlice.reducer;
