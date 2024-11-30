import { POST_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const postApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createPost: builder.mutation({
            query: (post) => ({
                url: `${POST_URL}/create`,
                method: 'POST',
                body: post,
            }),
            credentials: 'include',
            invalidatesTags: ['Posts']
        })
    })
});

export const { useCreatePostMutation } = postApi;