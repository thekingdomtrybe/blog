import apiSlice from '.';
import routes from './endpoints'

export default apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    indexArticles: builder.query({
      query: (params) => routes.index_published_articles(params),
      providesTags: ['Articles'],
    }),
    readArticle: builder.query({
      query: (id) => routes.read_article(id),
      providesTags: ['Article'],
    }),
    createArticle: builder.mutation({
      query: (category) => ({
        url: routes.create_article,
        method: 'POST',
        body: category,
      }),
      invalidatesTags: ['Drafts', 'Minister'],
    }),
    updateArticle: builder.mutation({
      query: (category) => ({
        url: routes.update_article,
        method: 'PUT',
        body: category,
      }),
      invalidatesTags: ['Article', 'Articles', 'Drafts']
    }),
    deleteArticle: builder.mutation({
      query: (id) => ({
        url: routes.delete_article(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Article', 'Articles', 'Drafts'],
    }),
    searchArticles: builder.query({
      query: (query) => routes.search_articles(query),
    }),
    indexDrafts: builder.query({
      query: () => routes.index_drafts,
      providesTags: ['Drafts'],
    }),
  }),
});

export const {
  useIndexArticlesQuery,
  useReadArticleQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  useSearchArticlesQuery,
  useIndexDraftsQuery,
} = apiSlice;
