import { getCSRFToken } from '@/lib/utils/getCSRFToken';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const uploadResume = createAsyncThunk('resume/upload', async (formData) => {
  const csrfToken = await getCSRFToken();
  const res = await axios.post('/api/resume/upload', formData, {
    headers: {
      'x-csrf-token': csrfToken,
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
});

const resumeSlice = createSlice({
  name: 'resume',
  initialState: {
    parsedData: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadResume.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadResume.fulfilled, (state, action) => {
        state.loading = false;
        state.parsedData = action.payload;
      })
      .addCase(uploadResume.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default resumeSlice.reducer;