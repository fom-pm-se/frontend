export interface Alert {
  title: string;
  message: string;
  type?:  "error" | "success" | "warning" | "info" | undefined;
}
