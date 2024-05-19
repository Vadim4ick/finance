/* eslint-disable react/display-name */
import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "../utils/index.utils";

type Variant = "primary";

type InputProps = {
  className?: string;
  variant?: Variant;
  label?: string;
  error?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, label, error, variant = "primary", ...otherProps } = props;

  const inp = (
    <input
      ref={ref}
      {...otherProps}
      className={cn(className, {
        "inp-primary": variant === "primary",
      })}
    />
  );

  if (label) {
    return (
      <label>
        <p
          className={cn(
            "cursor-pointer pb-1 text-[12px] text-black/80",
            error && "text-rose-400",
          )}
        >
          {label}
        </p>

        {inp}
      </label>
    );
  }

  return inp;
});
