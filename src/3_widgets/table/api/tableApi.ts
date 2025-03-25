/* eslint-disable perfectionist/sort-imports */
import type { ServerResponseType } from "@shared/model/types";

import { ErrorMessage, errorMessages } from "@shared/model/configs";
import { emptySplitApi } from "@widgets/splitting";
import { useCallback } from "react";

import type { TableRow } from "../model/types";

import { createEmptyRow as createEmptyRowDispatch, deleteCreatedRow as deleteCreatedRowDispatch, deleteRow as deleteRowDispatch, setRows, updateRow as updateRowDispatch } from "../model/tableSlice";

import { useAppDispatch } from "@app/appStore";

const tableApi = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    getTableInfo: builder.query<TableRow[], void>({
      query: () => ({
        url: "/userdocs/get",
        method: "GET",
      }),
      transformResponse: ({ data, error_text }: ServerResponseType<TableRow[]>) => {
        if (!data)
          throw new Error(error_text);
        return data;
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          const rows = response.data;

          dispatch(setRows(rows));
        }
        catch (err) {
          console.error(errorMessages[ErrorMessage.GET_ERROR], err);
        }
      },
    }),
    createRow: builder.mutation<TableRow, TableRow>({
      query: (data) => {
        // eslint-disable-next-line ts/no-unused-vars
        const { id: _, isNew: __, ...queryBody } = data;
        return {
          url: "/userdocs/create",
          method: "POST",
          body: queryBody,
        };
      },
      transformResponse: ({ data, error_text }: ServerResponseType<TableRow>) => {
        if (!data)
          throw new Error(error_text);
        return data;
      },
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          const row = await response.data;

          dispatch(deleteCreatedRowDispatch(id));
          dispatch(updateRowDispatch(row));
        }
        catch (err) {
          console.error(errorMessages[ErrorMessage.POST_ERROR], err);
        }
      },
    }),
    updateRow: builder.mutation<TableRow, TableRow>({
      query: (data) => {
        // eslint-disable-next-line ts/no-unused-vars
        const { isNew: _, id, ...queryBody } = data;
        return {
          url: `/userdocs/set/${id}`,
          method: "POST",
          body: queryBody,
        };
      },
      transformResponse: ({ data, error_text }: ServerResponseType<TableRow>) => {
        if (!data)
          throw new Error(error_text);
        return data;
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        }
        catch (err) {
          console.error(errorMessages[ErrorMessage.POST_ERROR], err);
        }
      },
    }),
    deleteRow: builder.mutation<void, string>({
      query: id => ({
        url: `/userdocs/delete/${id}`,
        method: "POST",
      }),
      transformResponse: ({ error_code, error_text }: ServerResponseType<null>) => {
        if (error_code)
          throw new Error(error_text);
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(deleteRowDispatch(id));
        }
        catch (err) {
          console.error(errorMessages[ErrorMessage.DELETE_ERROR], err);
        }
      },
    }),
  }),
});

export const { useGetTableInfoQuery, useCreateRowMutation, useUpdateRowMutation, useDeleteRowMutation } = tableApi;

export function useTableApi() {
  const dispatch = useAppDispatch();

  const createEmptyRow = useCallback((id: string) => {
    if (!id)
      return;
    dispatch(createEmptyRowDispatch(id));
  }, []);

  const deleteCreatedRow = useCallback((id: string) => {
    if (!id)
      return;
    dispatch(deleteCreatedRowDispatch(id));
  }, []);

  return { createEmptyRow, deleteCreatedRow } as const;
}
