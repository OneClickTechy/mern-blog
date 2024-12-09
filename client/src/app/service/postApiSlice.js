import { POST_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (post) => ({
        url: `${POST_URL}/create`,
        method: "POST",
        body: post,
        credentials: "include",
      }),
      invalidatesTags: ["Posts"],
    }),
    getPostsByAdmin: builder.query({
      query: ({
        startIndex = 0,
        limit = 9,
        sort = "desc",
        userId,
        category,
        slug,
        postId,
        searchTerm,
      }) => {
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
        return {
          url: `${POST_URL}/admin/getposts?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["Posts"],
    }),
    getPosts: builder.query({
      query: ({
        startIndex,
        limit,
        sort,
        userId,
        category,
        slug,
        postId,
        searchTerm,
      }) => {
        const params = new URLSearchParams();
        if(startIndex !== undefined && startIndex !== null && startIndex !== "") {
          params.set("startIndex", String(startIndex));
      }
      if(limit !== undefined && limit !== null && limit !== "") {
          params.set("limit", String(limit));
      }
      if(sort !== undefined && sort !== null && sort !== "") {
          params.set("sort", sort);
      }
      if(userId !== undefined && userId !== null &&userId !== "") {
          params.set("userId", userId);
      }
      if(category !== undefined && category !== null && category !== "") {
          params.set("category", category);
      }
      if(slug !== undefined && slug !== null && slug !== "") {
          params.set("slug", slug);
      }
      if(postId !== undefined && postId !== null && postId !== "") {
          params.set("postId", postId);
      }
      if(searchTerm !== undefined && searchTerm !== null && searchTerm !== "") {
          params.set("searchTerm", searchTerm);
      }
        return {
          url: `${POST_URL}/getposts?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
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
      query: ({postId, updatedData}) => ({
        url: `${POST_URL}/updatePost/${postId}`,
        method: "PATCH",
        credentials: "include",
        body: {
          title: updatedData.title,
          content: updatedData.content,
          category: updatedData.category,
          image: updatedData.image,
        },
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsByAdminQuery,
  useGetPostsQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
} = postApi;
