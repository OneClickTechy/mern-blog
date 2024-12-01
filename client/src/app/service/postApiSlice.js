import { POST_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (post) => ({
        url: `${POST_URL}/create`,
        method: "POST",
        body: post,
      }),
      credentials: "include",
      invalidatesTags: ["Posts"],
    }),
    getPostsByAdmin: builder.query({
      query: ({startIndex = 0, limit = 9, sort = "desc", userId, category, slug, postId, searchTerm}) => {
        
        const params = new URLSearchParams({
          startIndex: String(startIndex),
          limit: String(limit),
          sort,
          ...(userId && { userId }),
          ...(category && { category }),
          ...(slug && { slug }),
          ...(postId && { postId }),
          ...(searchTerm && { searchTerm }),
        });
        console.log(`${POST_URL}/getposts-as-admin?${params.toString()}`)
        return ({
            url: `${POST_URL}/getposts-as-admin?${params.toString()}`,
            method: 'GET',
            credentials: "include",
        });
      },
      providesTags: ["Posts"],
    }),
  
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `${POST_URL}/deletePost/${postId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Posts"],
    }),
    updatePost: builder.mutation({
      query: (postId) => ({
        url: `${POST_URL}/updatePost/${postId}`,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["Posts"],
    })
  }),
});

export const { useCreatePostMutation, useGetPostsByAdminQuery, useDeletePostMutation, useUpdatePostMutation } = postApi;
