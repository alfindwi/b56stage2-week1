import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiV1 } from '../libs/api';

interface SuggestedUsersState {
  users: Array<any>;
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
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Redux slice untuk suggested users
const suggestedUsersSlice = createSlice({
  name: 'suggestedUsers',
  initialState,
  reducers: {},
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

export default suggestedUsersSlice.reducer;
