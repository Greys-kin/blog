import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = "https://blog-platform.kata.academy/api";

export const blogApi = createApi({
  tagTypes: ["Articles", "Article", "User"],
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user?.user?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: (page) => `articles?limit=5&offset=${page}`,
      providesTags: ["Articles"],
    }),
    getAnArticle: builder.query({
      query: (slug) => `/articles/${slug}`,
      providesTags: ["Article"],
    }),
    createAnArticle: builder.mutation({
      query: ({ title, description, body, tagList }) => ({
        url: "/articles",
        method: "POST",
        body: {
          article: {
            title,
            description,
            body,
            tagList,
          },
        },
      }),
      invalidatesTags: ["Articles"],
    }),
    updateAnArticle: builder.mutation({
      query: ({ slug, title, description, body, tagList }) => ({
        url: `/articles/${slug}`,
        method: "PUT",
        body: {
          article: {
            title,
            description,
            body,
            tagList,
          },
        },
      }),
      invalidatesTags: ["Article", "Articles"],
    }),
    deleteAnArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: "DELETE",
      }),
    }),
    registerANewUser: builder.mutation({
      query: ({ username, email, password }) => ({
        url: "/users",
        method: "POST",
        body: {
          user: {
            username,
            email,
            password,
          },
        },
      }),
    }),
    existingUserLogin: builder.mutation({
      query: ({ email, password }) => ({
        url: "/users/login",
        method: "POST",
        body: {
          user: {
            email,
            password,
          },
        },
      }),
    }),
    updateCurrentUser: builder.mutation({
      query: ({ email, username, password, image }) => ({
        url: "/user",
        method: "PUT",
        body: {
          user: {
            email,
            username,
            password,
            image,
          },
        },
      }),
      invalidatesTags: ["User"],
    }),
    favoriteAnArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: "POST",
      }),
      invalidatesTags: ["Articles", "Article"],
    }),
    unfavoriteAnArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: "DELETE",
      }),
      invalidatesTags: ["Articles", "Article"],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetAnArticleQuery,
  useRegisterANewUserMutation,
  useExistingUserLoginMutation,
  useFavoriteAnArticleMutation,
  useUnfavoriteAnArticleMutation,
  useCreateAnArticleMutation,
  useUpdateCurrentUserMutation,
  useDeleteAnArticleMutation,
  useUpdateAnArticleMutation,
} = blogApi;
