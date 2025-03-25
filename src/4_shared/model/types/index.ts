export type ServerResponseType<T> = {
  data: T | null;
  error_code: number;
  error_text: string;
  profiling: string;
  timings: null;
};
