import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/auth" }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userInfo) => ({
        url: "/signup",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["Auth"],
    }),
    signin: builder.mutation({
      query: (userInfo) => ({
        url: "/signin",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["Auth"],
    }),
    googleAuth: builder.mutation({
      query: (userInfo) => ({
        url: "/google",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useSignupMutation, useSigninMutation, useGoogleAuthMutation } = authApi;
