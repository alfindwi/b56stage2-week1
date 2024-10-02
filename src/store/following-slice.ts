import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiV1 } from "../libs/api";
import { FollowEntity } from "../entities/follow";

interface FollowersState {
    followed: FollowEntity[];
    loading: boolean;
    error: string | null;
}

const initialState: FollowersState = {
  followed: [],
    loading: false,
    error: null,
};

export const fetchFolloweds = createAsyncThunk(
    "followeds/fetchFolloweds",
    async () => {
        const response = await apiV1.get(`/following`);
        return response.data.map((followed: any) => ({
            ...followed,
            followeds: followed.following,
        }));
    }
);

    export const followedUser = createAsyncThunk(
    'following/followedUser',
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
  

  const followedsSlice = createSlice({
    name: "followed",
    initialState,
    reducers: {
      clearFollowers(state) {
        state.followed = [];
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchFolloweds.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchFolloweds.fulfilled, (state, action: PayloadAction<FollowEntity[]>) => {
          state.followed = action.payload;
          state.loading = false;
        })
        .addCase(followedUser.fulfilled, (state, action) => {
          const user = state.followed.find(f => f.followed.id === action.meta.arg);
          if (user) {
            user.isFollowing = true; // Update state setelah follow
          }
        })
        .addCase(unfollowUser.fulfilled, (state, action) => {
          const user = state.followed.find(f => f.followed.id === action.meta.arg);
          if (user) {
            user.isFollowing = false;
          }
        })
        .addCase(fetchFolloweds.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Failed to fetch followers.";
        });
    },
  });
  
export const { clearFollowers } = followedsSlice.actions;

export default followedsSlice.reducer;
