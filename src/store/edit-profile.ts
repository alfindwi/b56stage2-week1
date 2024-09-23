import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProfileContent } from "../entities/user";

interface ContentState {
    content: ProfileContent[];
}

const initialState: ContentState = {
    content: [],
};

export const fetchContent = createAsyncThunk(
    "fetchContent",
    async () => {
      const response = await fetch("https://api.npoint.io/330cca3affa797288312"); 
      const data: ProfileContent[] = await response.json();
      return data;
    }
);


const contentSlice = createSlice({
    name: "content",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchContent.fulfilled, (state, action) => {
                state.content = action.payload;
            })
    }
});

export default contentSlice.reducer;
