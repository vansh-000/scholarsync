import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './slices/resumeSlice';
import scholarReducer from './slices/scholarSlice';
import suggestionsReducer from './slices/suggestionsSlice';

const store = configureStore({
  reducer: {
    resume: resumeReducer,
    scholar: scholarReducer,
    suggestions: suggestionsReducer,
  },
});

export default store;