import apiSlice from '.';
import routes from './endpoints'

export default apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    askQuestion: builder.mutation({
      query: (question) => ({
        url: routes.ask_question,
        method: 'POST',
        body: question,
      }),
    }),
  }),
});

export const {
  useAskQuestionMutation,
} = apiSlice;
