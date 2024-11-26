import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => `${USERS_URL}/profile`,
            credentials: "include",
            providesTags: ["Auth"],
        }),
    }),
});

export const { useGetUserQuery } = userApi;