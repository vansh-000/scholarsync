import { getCSRFToken } from '@/lib/utils/getCSRFToken';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const generateSuggestions = createAsyncThunk(
  'suggestions/generate',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const resumeData = state.resume?.parsedData || null;
      const scholarData = state.scholar?.profileData?.data || null;
      if (!resumeData && !scholarData) {
        throw new Error('No resume or scholar data available');
      }
      const csrfToken = await getCSRFToken();
      const response = await axios.post('/api/suggestions/generate', {
        resumeData,
        scholarData
      }, {
        headers: {
          'x-csrf-token': csrfToken,
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Generate suggestions error:', error);
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

const suggestionSlice = createSlice({
  name: 'suggestions',
  initialState: {
    suggestions: [],
    loading: false,
    error: null
  },
  reducers: {
    clearSuggestions: (state) => {
      state.suggestions = [];
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(generateSuggestions.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = action.payload.data || action.payload;
        state.error = null;
      })
      .addCase(generateSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to generate suggestions';
        state.suggestions = [];
      });
  },
});

export const { clearSuggestions, clearError } = suggestionSlice.actions;
export default suggestionSlice.reducer;