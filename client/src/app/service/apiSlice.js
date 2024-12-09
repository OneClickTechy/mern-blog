import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const BASE_URL = import.meta.env.VITE_API_URL || "";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Auth", "Posts", "Comment"],
  endpoints: () => ({}),
});