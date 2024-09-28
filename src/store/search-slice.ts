import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchResultEntity } from "../entities/user";
import { apiV1 } from "../libs/api";

interface SearchState {
    query: string
    results: SearchResultEntity[]
}

export const fetchDummyUsers = createAsyncThunk(
  "users/fetchDummyUsers",
  async () => {
    const response = await apiV1.get("/users");
    console.log("ini response data",response.data)
    return response.data; 
  }
);

const initialState : SearchState = {
    query: "",
    results: [],
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
      setQuery: (state, action: PayloadAction<string>) => {
        state.query = action.payload;
      },
      filterResults: (state) => {
        const query = state.query.toLowerCase();
        state.results = state.results.filter((result) =>
          result.fullName.toLowerCase().includes(query)
        );
      },
      
      resetSearch: (state) => {
        state.query = "";
      },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDummyUsers.fulfilled, (state, action) => {
          console.log("Data yang diterima:", action.payload); 
          // Ambil hanya properti yang dibutuhkan
          state.results = action.payload.data.map((user: any) => ({
            fullName: user.fullName,
            username: user.username,
            bio: user.bio,
            image: user.image,
          }));
        });
      }        
  });
  
export const { setQuery, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
