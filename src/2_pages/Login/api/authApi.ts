import type { ServerResponseType } from "@shared/model/types";

import { ErrorMessage, errorMessages } from "@shared/model/configs";
import { emptySplitApi } from "@widgets/splitting";

import type { LoginForm } from "../model/types";

const authApi = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<string, LoginForm>({
      query: credentials => ({
        url: "/login",
        method: "POST",
        body: { ...credentials },
      }),
      transformResponse: ({ data }: ServerResponseType<{ token: string }>) => {
        if (!data)
          throw new Error(errorMessages[ErrorMessage.AUTH_ERROR]);
        return data.token;
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          const token = await result.data;
          // Сохранение данных пользователя в локальном хранилище
          localStorage.setItem("token", JSON.stringify(token));
        }
        catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
