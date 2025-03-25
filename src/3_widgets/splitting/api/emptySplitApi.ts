import type { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query/react";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiPaths } from "@shared/model/configs";

export type ICustomError = {
  data: {
    error: string;
  };
  status: number;
};

const baseQuery = fetchBaseQuery({
  baseUrl: ApiPaths.HOST + ApiPaths.PATH,
  prepareHeaders: (headers) => {
    const token = JSON.parse(localStorage.getItem("token") || "null");
    if (token) {
      headers.set("x-auth", token);
    }
    return headers;
  },
}) as BaseQueryFn<string | FetchArgs, unknown, ICustomError, object>;

export const emptySplitApi = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: () => ({}),
});
