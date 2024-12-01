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
        credentials: "include",
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
    signout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/signout`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useSignupMutation, useSigninMutation, useGoogleAuthMutation, useSignoutMutation } =
  authApi;
