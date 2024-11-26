import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";
USERS_URL
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userInfo) => ({
        url: `${USERS_URL}/signup`,
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["Auth"],
    }),
    signin: builder.mutation({
      query: (userInfo) => ({
        url: `${USERS_URL}/signin`,
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["Auth"],
    }),
    googleAuth: builder.mutation({
      query: (userInfo) => ({
        url: `${USERS_URL}/google`,
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
})

export const { useSignupMutation, useSigninMutation, useGoogleAuthMutation } = authApi;
