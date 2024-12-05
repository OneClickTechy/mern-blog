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
        })
    })
})

export const { useCreateCommentMutation } = commentApi;