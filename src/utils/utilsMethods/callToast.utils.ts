interface ToastInfo {
  message: string;
  theme: "success" | "error" | "warning";
}

const CallToast = (statusCode: number, customMessage?: string): ToastInfo => {
  let message = "";

  if (customMessage) {
    message = customMessage;
  } else {
    if (statusCode >= 200 && statusCode < 300) {
      message = "Operation successful!";
    } else if (statusCode >= 400 && statusCode < 500) {
      message = "Client-side error occurred.";
    } else if (statusCode >= 500) {
      message = "Server-side error occurred.";
    } else {
      message = "Warning: Unexpected status code.";
    }
  }
  let theme: "success" | "error" | "warning" = "success";
  if (statusCode >= 200 && statusCode < 300) {
    theme = "success";
  } else if (statusCode >= 400 && statusCode < 500) {
    theme = "error";
  } else if (statusCode >= 500) {
    theme = "error";
  } else {
    theme = "warning";
  }

  return { message, theme };
};

export default CallToast;
