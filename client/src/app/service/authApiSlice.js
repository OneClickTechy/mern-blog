import { AUTH_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userInfo) => ({
        url: `${AUTH_URL}/signup`,
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["Auth"],
    }),
    signin: builder.mutation({
      query: (userInfo) => ({
        url: `${AUTH_URL}/signin`,
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["Auth"],
    }),
    googleAuth: builder.mutation({
      query: (userInfo) => ({
        url: `${AUTH_URL}/google`,
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
})

export const { useSignupMutation, useSigninMutation, useGoogleAuthMutation } = authApi;
