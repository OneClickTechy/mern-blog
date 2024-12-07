import { COMMENT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const commentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createComment: builder.mutation({
            query: (data) => ({
                url: `${COMMENT_URL}/create`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["Comments"],
        }),
        getComments: builder.query({
            query: (postId) => `${COMMENT_URL}/${postId}`,
            providesTags: ["Comments"],
        }),
        likeComment: builder.mutation({
            query: (commentId) => ({
                url: `${COMMENT_URL}/likeComment/${commentId}`,
                method: "PUT",
                credentials: "include",
            }),
            invalidatesTags: ["Comments"],
        }),
        editComment: builder.mutation({
            query: (data) => ({
                url: `${COMMENT_URL}/editComment/${data.commentId}`,
                method: "PUT",
                body: {content:data.content},
                credentials: "include",
            }),
            invalidatesTags: ["Comments"],
        }),
        deleteComment: builder.mutation({
            query: (commentId) => ({
                url: `${COMMENT_URL}/deleteComment/${commentId}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Comments"],
        }),
        getAllComments: builder.query({
            query: ({startIndex, limit, sort}) => {
                const params = new URLSearchParams();
                if(startIndex !== undefined && startIndex !== null) {
                    params.set("startIndex", String(startIndex));
                }
                if(limit !== undefined && limit !== null) {
                    params.set("limit", String(limit));
                }
                if(sort !== undefined && sort !== null) {
                    params.set("sort", sort);
                }
                return {
                    url: `${COMMENT_URL}?${params.toString()}`,
                    credentials: "include",
                }
            },
            providesTags: ["Comments"],
        })
        
    })
})

export const { useCreateCommentMutation, useGetCommentsQuery, useLikeCommentMutation, useEditCommentMutation, useDeleteCommentMutation, useGetAllCommentsQuery } = commentApi;