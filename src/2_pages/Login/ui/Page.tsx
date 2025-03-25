import type { SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Backdrop, CircularProgress } from "@mui/material";
import { AppPaths } from "@shared/model/configs";
import { Form } from "@widgets/form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import type { LoginForm } from "../model/types";

import { useLoginMutation } from "../api/authApi";
import { FormField, formFields, FormSchema } from "../model/config";

export default function Login() {
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<LoginForm>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      [FormField.USERNAME]: "",
      [FormField.PASSWORD]: "",
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    await login(data)
      .unwrap()
      .then(() => navigate(AppPaths.HOME, { replace: true }));
  };

  return (
    <main className="flex flex-col items-center justify-center gap-4 p-8">
      <Form<LoginForm, typeof formFields>
        handleSubmit={handleSubmit(onSubmit)}
        control={control}
        fields={formFields}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
      {isLoading
        && (
          <Backdrop
            open
            className="z-10 text-white"
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
    </main>
  );
}
