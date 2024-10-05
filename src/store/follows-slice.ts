import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiV1 } from "../libs/api"; 
import Cookies from "js-cookie";

// Define the state interface for follow
interface FollowState {
  following: any[];
  followers: any[];
  loading: boolean;
  error: string | null;
}

// Initial state for follows
const initialState: FollowState = {
  following: [],
  followers: [],
  loading: false,
  error: null,
};

// Async thunk to follow a user
export const followUser = createAsyncThunk(
  "follows/followUser",
  async (followedId: number, { rejectWithValue }) => {
    console.log("Follow user ID: ", followedId);
    try {
      const response = await apiV1.post(
        "/follow",
        { followedId },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      return { userId: followedId, ...response.data };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to follow user"
      );
    }
  }
);

// Async thunk to unfollow a user
export const unfollowUser = createAsyncThunk(
  "follows/unfollowUser",
  async (followedId: number, { rejectWithValue }) => {
    try {
      const response = await apiV1.post(
        "/unfollow",
        { followedId },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      return { userId: followedId, ...response.data };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to unfollow user"
      );
    }
  }
);

// Async thunk to fetch users the current user is following
export const fetchFollowing = createAsyncThunk(
  "follows/fetchFollowing",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiV1.get("/following", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch following"
      );
    }
  }
);

// Async thunk to fetch followers of the current user
export const fetchFollowers = createAsyncThunk(
  "follows/fetchFollowers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiV1.get("/followers", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch followers"
      );
    }
  }
);

// Create a slice for follow actions
const followSlice = createSlice({
  name: "follows",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle follow user actions
    builder
      .addCase(followUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.loading = false;
        const followedUser = action.payload.userId;

        // Add the user to followers if not already in the list
        if (!state.followers.some((follower) => follower.follower.id === followedUser)) {
          state.followers.push({
            follower: { id: followedUser, ...action.payload }, // Assuming API returns full user data
            isFollowing: true,
          });
        }

        // Add the user to following if not already in the list
        if (!state.following.some((f) => f.followedId === followedUser)) {
          state.following.push({ followedId: followedUser });
        }
      })
      .addCase(followUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Handle unfollow user actions
    builder
      .addCase(unfollowUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.loading = false;
        const unfollowedUser = action.payload.userId;

        // Update followers list to set isFollowing to false
        state.followers = state.followers.map((follower) => {
          if (follower.follower.id === unfollowedUser) {
            return { ...follower, isFollowing: false };
          }
          return follower;
        });

        // Remove user from following list
        state.following = state.following.filter(
          (user) => user.followedId !== unfollowedUser
        );
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Handle fetching following users
    builder.addCase(fetchFollowing.fulfilled, (state, action) => {
      state.following = action.payload; // Assuming API returns list of users followed
    });

    // Handle fetching followers
    builder.addCase(fetchFollowers.fulfilled, (state, action) => {
      state.followers = action.payload; // Assuming API returns list of followers
    });
  },
});

// Export the reducer
export default followSlice.reducer;
