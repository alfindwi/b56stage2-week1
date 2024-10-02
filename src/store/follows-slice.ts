import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiV1 } from "../libs/api";
import { FollowEntity } from "../entities/follow";

interface FollowersState {
    followers: FollowEntity[];
    loading: boolean;
    error: string | null;
}

const initialState: FollowersState = {
    followers: [],
    loading: false,
    error: null,
};

// Async thunk to fetch followers
export const fetchFollowers = createAsyncThunk(
    "followers/fetchFollowers",
    async () => {
        const response = await apiV1.get(`/followers`);
        return response.data.map((follow: any) => ({
            ...follow,
            followers: follow.follower,
        }));
    }
);

    export const followUser = createAsyncThunk(
    'followers/followUser',
    async (userId: number) => {
      await apiV1.post(`/follow`, { followingId: userId });
      return userId; 
    }
  );
  
  
  
  export const unfollowUser = createAsyncThunk(
    "followers/unfollowUser",
    async (userId: number) => {
      await apiV1.post(`/unfollow`, { followingId: userId });
      return userId; 
    }
  );
  



  const followersSlice = createSlice({
    name: "followers",
    initialState,
    reducers: {
      clearFollowers(state) {
        state.followers = [];
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchFollowers.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchFollowers.fulfilled, (state, action: PayloadAction<FollowEntity[]>) => {
          state.followers = action.payload;
          state.loading = false;
        })
        .addCase(followUser.fulfilled, (state, action) => {
          const user = state.followers.find(f => f.followers.id === action.meta.arg);
          if (user) {
            user.isFollowing = true; // Update state setelah follow
          }
        })
        .addCase(unfollowUser.fulfilled, (state, action) => {
          const user = state.followers.find(f => f.followers.id === action.meta.arg);
          if (user) {
            user.isFollowing = false;
          }
        })
        .addCase(fetchFollowers.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Failed to fetch followers.";
        });
    },
  });
  
export const { clearFollowers } = followersSlice.actions;

export default followersSlice.reducer;
