import { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "../utils/index.utils";

export type UiButtonVariant = "green" | "black" | "red" | "reset";

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
          black: "btn btn-black",
          reset:
            "flex items-center px-4 py-2 text-gray-700 transition-colors hover:bg-accent",
        }[variant],
      )}
    >
      {children}
    </button>
  );
};
