import apiSlice from '.';
import routes from './endpoints'

export default apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    indexCategories: builder.query({
      query: () => routes.index_categories,
      providesTags: ['Categories'],
    }),
    readCategory: builder.query({
      query: (name) => routes.read_category(name),
      providesTags: ['Category'],
    }),
    createCategory: builder.mutation({
      query: (category) => ({
        url: routes.create_category,
        method: 'POST',
        body: category,
      }),
      invalidatesTags: ['Categories'],
    }),
    updateCategory: builder.mutation({
      query: (category) => ({
        url: routes.update_category,
        method: 'PUT',
        body: category,
      }),
      invalidatesTags: ['Categories', 'Category'],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: routes.delete_category(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Categories', 'Category'],
    }),
  }),
});

export const {
  useIndexCategoriesQuery,
  useReadCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = apiSlice;
