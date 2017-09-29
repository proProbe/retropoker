export type TErrorSeverity = "warning" | "error";
export type TError = {
  message: string,
  type: TErrorSeverity,
};