import type { SerializedError } from "@reduxjs/toolkit";
import type { ICustomError } from "@widgets/splitting";
import type { FormEventHandler } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";

import { Button, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

type Props<T extends FieldValues, K extends object> = {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  control: Control<T>;
  fields: K;
  isLoading: boolean;
  isError: boolean;
  error: ICustomError | SerializedError | undefined;
};
export default function Form<T extends FieldValues, K extends object>({ handleSubmit, control, fields, isLoading, isError, error }: Props<T, K>) {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xs flex-col gap-3 "
    >
      {(Object.keys(fields)).map(formKey => (
        <Controller
          key={formKey}
          name={formKey as Path<T>}
          control={control}
          render={({ field, fieldState: { error, invalid } }) => (
            <TextField
              {...fields[formKey as keyof K]}
              {...field}
              helperText={error?.message}
              error={invalid}
            />
          )}
        />
      ),
      )}
      <Button
        type="submit"
        disabled={isLoading}
        className="!py-3"
        variant="contained"
      >
        Войти
      </Button>
      <p className="text-base font-semibold text-destructive sm:text-lg md:text-xl">
        {isError
          && typeof error !== "undefined"
          && "data" in error
          && error.data.error}
      </p>
    </form>
  );
}
