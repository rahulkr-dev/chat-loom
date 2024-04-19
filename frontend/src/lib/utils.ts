import { IBackendError } from "@/pages/auth/types";
import { AxiosError } from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getErrorMessage(error: AxiosError | null): string {
  let errorMessage = "";
  if(!error ) return errorMessage
  
  if (error.response?.data) {
    const backendError = error.response.data as IBackendError;
    if (backendError.errors && backendError.errors.length > 0) {
      errorMessage = backendError.errors[0].msg;
    }
  }
  return errorMessage;
}
