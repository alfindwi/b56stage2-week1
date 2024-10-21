import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchResultEntity } from "../entities/user";
import { apiV1 } from "../libs/api"; 

interface SearchState {
  query: string;
  results: SearchResultEntity[];
}

export const fetchDummyUsers = createAsyncThunk(
  "users/fetchDummyUsers",
  async (query: string) => {
    const response = await apiV1.get(`/search?q=${query}`); 
    return response.data.users; 
  }
);

const initialState: SearchState = {
  query: "",
  results: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    resetSearch: (state) => {
      state.query = "";
      state.results = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDummyUsers.fulfilled, (state, action) => {
      state.results = action.payload.map((user: any) => ({
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        bio: user.bio,
        image: user.image,
      }));
    });
  },
});

export const { setQuery, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
