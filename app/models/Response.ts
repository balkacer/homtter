type Response<T> = {
  data: T | null;
  message: string;
  success: boolean;
  messageType: "WARNING" | "DANGER" | "INFO" | "SUCCESS"
}

export default Response;