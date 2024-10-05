import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiV1 } from "../libs/api"; 
import Cookies from "js-cookie";

interface FollowState {
  following: any[];
  followers: any[];
  loading: boolean;
  error: string | null;
}

const initialState: FollowState = {
  following: [],
  followers: [],
  loading: false,
  error: null,
};

export const followUser = createAsyncThunk(
  "follows/followUser",
  async (followedId: number, { rejectWithValue }) => {
    console.log("Follow user ID: ", followedId); 
    try {
      const response = await apiV1.post("/follow", { followedId },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      return { userId: followedId, ...response.data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Failed to follow user");
    }
  }
);


export const unfollowUser = createAsyncThunk(
  "follows/unfollowUser",
  async (followedId: number, { rejectWithValue }) => {
    try {
      const response = await apiV1.post("/unfollow", { followedId },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      return { userId: followedId, ...response.data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Failed to unfollow user");
    }
  }
);

export const fetchFollowing = createAsyncThunk(
  "follows/fetchFollowing",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiV1.get("/following");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch following");
    }
  }
);

export const fetchFollowers = createAsyncThunk(
  "follows/fetchFollowers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiV1.get("/followers");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch followers");
    }
  }
);

const followSlice = createSlice({
  name: "follows",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(followUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.loading = false;
        const followedUser = action.payload.userId;

        state.followers = state.followers.map(follower => {
          if (follower.follower.id === followedUser) {
            return {
              ...follower,
              isFollowing: true,
            };
          }
          return follower;
        });

        if (!state.following.some(f => f.id === followedUser)) {
          state.following.push({ followedId: followedUser });
        }
      })
      .addCase(followUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(unfollowUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.loading = false;
        const unfollowedUser = action.payload.userId;

        // Update followers array to mark the user as not followed
        state.followers = state.followers.map(follower => {
          if (follower.follower.id === unfollowedUser) {
            return {
              ...follower,
              isFollowing: false,
            };
          }
          return follower;
        });

        // Remove user from following array
        state.following = state.following.filter(user => user.followedId !== unfollowedUser);
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetching following
    builder
      .addCase(fetchFollowing.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFollowing.fulfilled, (state, action) => {
        state.loading = false;
        state.following = action.payload;
      })
      .addCase(fetchFollowing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetching followers
    builder
      .addCase(fetchFollowers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFollowers.fulfilled, (state, action) => {
        state.loading = false;
        state.followers = action.payload;
      })
      .addCase(fetchFollowers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default followSlice.reducer;
