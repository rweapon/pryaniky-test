export const BASE_PATH = import.meta.env.BASE_URL;

export enum AppPaths {
  ALL = "*",
  HOME = "/",
  LOGIN = "/login",
}

export enum ApiPaths {
  HOST = "https://test.v5.pryaniky.com",
  PATH = "/ru/data/v3/testmethods/docs/",
}

export enum ErrorMessage {
  AUTH_ERROR = "auth_error",
  GET_ERROR = "get_error",
  POST_ERROR = "post_error",
  DELETE_ERROR = "delete_error",
  PUT_ERROR = "put_error",
}

export const errorMessages: Record<ErrorMessage, string> = {
  [ErrorMessage.AUTH_ERROR]: "Ошибка авторизации. Проверьте логин и пароль",
  [ErrorMessage.GET_ERROR]: "Не удалось загрузить данные. Попробуйте позже",
  [ErrorMessage.POST_ERROR]: "Ошибка при отправке данных. Проверьте введённые значения",
  [ErrorMessage.PUT_ERROR]: "Ошибка при обновлении данных. Попробуйте снова",
  [ErrorMessage.DELETE_ERROR]: "Ошибка при удалении. Возможно, данные уже используются",
};
