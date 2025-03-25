import type { z } from "zod";

import type { FormSchema } from "./config";

export type FormType = {
  label: string;
  required: boolean;
  type: "text" | "password";
};

export type LoginForm = z.infer<typeof FormSchema>;
