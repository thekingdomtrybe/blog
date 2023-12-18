import apiSlice from '.';
import routes from './endpoints'

export default apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (credentials) => ({
        url: routes.admin_session,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Admin', 'Categories', 'Ministers'],
    }),
    getSignedInAdmin: builder.query({
      query: () => routes.current_admin,
      providesTags: ['Admin'],
    }),
    logoutAdmin: builder.mutation({
      query: () => ({
        url: routes.destroy_admin_session,
        method: 'DELETE',
      }),
      invalidatesTags: ['Admin'],
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useGetSignedInAdminQuery,
  useLogoutAdminMutation,
} = apiSlice;
