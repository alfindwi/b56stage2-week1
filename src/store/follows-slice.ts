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

        // Update followers array
        if (!state.followers.some(follower => follower.follower.id === followedUser)) {
          state.followers.push({
            follower: { id: followedUser },
            isFollowing: true,
          });
        }

        if (!state.following.some(f => f.followedId === followedUser)) {
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

        state.followers = state.followers.map(follower => {
          if (follower.follower.id === unfollowedUser) {
            return { ...follower, isFollowing: false };
          }
          return follower;
        });

        state.following = state.following.filter(user => user.followedId !== unfollowedUser);
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetching following and followers logic remains unchanged
  },
});

export default followSlice.reducer;

