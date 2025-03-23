import type { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query/react";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type ICustomError = {
  data: {
    error: string;
  };
  status: number;
};

const baseQuery = fetchBaseQuery({
  baseUrl: "example.com",
  // prepareHeaders: (headers, { getState }) => {
  //   const token = (<RootState>getState()).auth.token;
  //   if (token) {
  //     headers.set("Authorization", `Bearer ${token}`);
  //   }
  //   return headers;
  // },
}) as BaseQueryFn<string | FetchArgs, unknown, ICustomError, object>;

export const emptySplitApi = createApi({
  baseQuery,
  endpoints: () => ({}),
});
