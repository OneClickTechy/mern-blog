import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () =>({
                url: `${USERS_URL}/profile`,
                method: "GET",
                credentials: "include",
            }),
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
            query: (id) => ({
                url: `${USERS_URL}/profile/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags:['Auth'],
        }),
        getUsers: builder.query({
            query: ({
                startIndex = 0,
                limit = 9,
                sort = "desc",
            }) => {
                const params = new URLSearchParams({
                    startIndex: String(startIndex),
                    limit: String(limit),
                    sort,
                })
                return {
                    url: `${USERS_URL}/getUsers?${params.toString()}`,
                    method: "GET",
                    credentials: "include",
                }
            },
            credentials: "include",
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `${USERS_URL}/profile/${id}`,
                method: "GET",
                credentials: "include",
            }),
            credentials: "include",
        })
    }),
});

export const { useGetUserQuery, useUpdateUserMutation, useDeleteUserMutation, useGetUsersQuery, useGetUserByIdQuery } = userApi;