import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatErrors = <T>(errors: T) => {
  let errorMessage = "";
  Object.values(errors!).forEach((error: any) => {
    errorMessage += `${error.message} <br />`;
  });
  return errorMessage.trim();
};
