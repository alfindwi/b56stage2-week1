import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiV1 } from '../libs/api';

interface SuggestedUser {
  id: number;
  fullName: string;
  username: string;
  image?: string;
}

interface SuggestedUsersState {
  users: SuggestedUser[];
  loading: boolean;
  error: string | null;
}

const initialState: SuggestedUsersState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchSuggestedUsers = createAsyncThunk(
  'suggestedUsers/fetch',
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await apiV1.get(`/users/${userId}/suggestion`);
      const users =  response.data as SuggestedUser[];

      const shufledUsers = users.sort(() => 0.5 - Math.random());
      return shufledUsers.slice(0, 4);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const suggestedUsersSlice = createSlice({
  name: 'suggestedUsers',
  initialState,
  reducers: {
    resetSuggestions: (state) => {
      state.users = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestedUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuggestedUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchSuggestedUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSuggestions } = suggestedUsersSlice.actions;

export default suggestedUsersSlice.reducer;
