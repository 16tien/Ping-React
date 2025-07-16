import { message } from "antd";
import type { AxiosError } from "axios";

interface ErrorResponse {
  message?: string; 
}

export function handleApiError(error: unknown) {
  const err = error as AxiosError<ErrorResponse>;

  if (err?.response) {
    const status = err.response.status;
    const text =
      err.response.data?.message || "Something went wrong";

    if (status === 400) message.warning(text);
    else if (status === 403) message.error("Forbidden: " + text);
    else if (status === 500) message.error("Server error, please try later");
    else message.error(text);
  } else {
    message.error("Network error, please check your connection");
  }
}
