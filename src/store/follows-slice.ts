import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Follows } from "../types/user";

interface FollowsState {
    followers: Follows[];
    following: Follows[];
}

const initialState: FollowsState = {
    followers: [],
    following: []
};

export const fetchFollowers = createAsyncThunk(
    "follows/fetchFollowers",
    async () => {
      const response = await fetch("https://api.npoint.io/0cb85411906a331ae12f"); 
      const data: Follows[] = await response.json();
      return data;
    }
);

export const fetchFollowing = createAsyncThunk(
    "follows/fetchFollowing",
    async () => {
      const response = await fetch("https://api.npoint.io/b54de9691718c3db9bb3"); 
      const data: Follows[] = await response.json();
      return data;
    }
);

const followsSlice = createSlice({
    name: "follows",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFollowers.fulfilled, (state, action) => {
                state.followers = action.payload;
            })
            .addCase(fetchFollowing.fulfilled, (state, action) => {
                state.following = action.payload;
            });
    }
});

export default followsSlice.reducer;
