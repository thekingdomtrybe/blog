import { combineReducers, configureStore } from '@reduxjs/toolkit';
import apiSlice from '.';

export default configureStore({
  reducer: combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(apiSlice.middleware),
});
