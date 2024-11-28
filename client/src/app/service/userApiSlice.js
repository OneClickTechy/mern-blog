import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => `${USERS_URL}/profile`,
            credentials: "include",
            providesTags: ["Auth"],
        }),
        updateUser: builder.mutation({
            query: (userInfo) => ({
                url: `${USERS_URL}/profile`,
                method: "PUT",
                body: userInfo,
                credentials: "include",
            }),
            invalidatesTags: ["Auth"],
        }),
        deleteUser: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/profile`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags:['Auth'],
        })
    }),
});

export const { useGetUserQuery, useUpdateUserMutation, useDeleteUserMutation } = userApi;