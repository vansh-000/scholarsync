import { getCSRFToken } from '@/lib/utils/getCSRFToken';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchScholarProfile = createAsyncThunk('scholar/fetch', async url => {
  const csrfToken = await getCSRFToken();
  const res = await axios.post('/api/scholar/profile', { scholarUrl: url }, {
    headers: {
      'x-csrf-token': csrfToken,
      'Content-Type': 'application/json',
    }

  });
  return res.data;
});

const scholarSlice = createSlice({
  name: 'scholar',
  initialState: {
    profileData: null,
    loading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchScholarProfile.pending, state => {
        state.loading = true;
      })
      .addCase(fetchScholarProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload;
      })
      .addCase(fetchScholarProfile.rejected, state => {
        state.loading = false;
      });
  },
});

export default scholarSlice.reducer;
