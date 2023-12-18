import apiSlice from '.';
import routes from './endpoints'

export default apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addMinister: builder.mutation({
      query: (minister) => ({
        url: routes.create_minister,
        method: 'POST',
        body: minister,
      }),
      invalidatesTags: ['Ministers'],
    }),
    ministerLogin: builder.mutation({
      query: (credentials) => ({
        url: routes.minister_session,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Minister'],
    }),
    indexMinisters: builder.query({
      query: () => routes.index_ministers,
      providesTags: ['Ministers'],
    }),
    getMinister: builder.query({
      query: (url) => routes.read_minister(url),
    }),
    getSignedInMinister: builder.query({
      query: () => routes.current_minister,
      providesTags: ['Minister'],
    }),
    logoutMinister: builder.mutation({
      query: () => ({
        url: routes.destroy_minister_session,
        method: 'DELETE',
      }),
      invalidatesTags: ['Minister'],
    }),
    confirmMinister: builder.query({
      query: (token) => routes.minister_confirmation(token),
      invalidatesTags: ['Minister'],
    }),
    resetMinisterPassword: builder.mutation({
      query: (credentials) => ({
        url: routes.create_minister_password_token,
        method: 'POST',
        body: credentials,
      }),
    }),
    updateMinisterPassword: builder.mutation({
      query: (credentials) => ({
        url: routes.update_minister_password,
        method: 'PUT',
        body: credentials,
      }),
    }),
    updateMinister: builder.mutation({
      query: (minister) => ({
        url: routes.update_minister,
        method: 'PUT',
        body: minister,
      }),
      invalidatesTags: ['Minister'],
    }),
    deleteMinister: builder.mutation({
      query: (id) => ({
        url: routes.delete_minister(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Ministers', 'Minister'],
    }),
  }),
});

export const {
  useMinisterLoginMutation,
  useAddMinisterMutation,
  useIndexMinistersQuery,
  useConfirmMinisterQuery,
  useGetMinisterQuery,
  useGetSignedInMinisterQuery,
  useLogoutMinisterMutation,
  useUpdateMinisterMutation,
  useDeleteMinisterMutation,
  useResetMinisterPasswordMutation,
  useUpdateMinisterPasswordMutation,
} = apiSlice;
