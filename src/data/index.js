import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    credentials: 'include',
  }),
  endpoints: () => ({
  }),
  tagTypes: ['Admin', 'Minister', 'Drafts', 'Article', 'Articles', 'Category', 'Categories'],
});

export default apiSlice;
