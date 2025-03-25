import { z } from "zod";

import type { FormType } from "./types";

export enum FormField {
  USERNAME = "username",
  PASSWORD = "password",
}

export const formFields: Record<FormField, FormType> = {
  [FormField.USERNAME]: {
    label: "Логин",
    required: true,
    type: "text",
  },
  [FormField.PASSWORD]: {
    label: "Пароль",
    required: true,
    type: "password",
  },
};

export const FormSchema = z.object({
  [FormField.USERNAME]: z.string().min(5, { message: "Имя пользователя должно содержать не менее 5 символов" }),
  [FormField.PASSWORD]: z.string().min(8, { message: "Пароль должен содержать не менее 8 символов" }),
});
