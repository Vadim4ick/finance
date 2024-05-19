import { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "../utils/index.utils";

export type UiButtonVariant = "green" | "red" | "clear";

type ButtonProps = {
  children: ReactNode;
  variant?: UiButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: ButtonProps) => {
  const { className, children, variant = "green", ...otherProps } = props;

  return (
    <button
      {...otherProps}
      className={cn(
        className,
        {
          green: "btn btn-green",
          red: "btn btn-red",
          clear: "",
        }[variant],
      )}
    >
      {children}
    </button>
  );
};
