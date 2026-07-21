import { InputHTMLAttributes, forwardRef, useState } from "react";

import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  initialValue?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ initialValue, onChange, ...props }, ref) => {
    const { className, ...rest } = props;
    const [value, setValue] = useState(initialValue || "");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setValue(inputValue);

      if (onChange) {
        onChange(e);
      }
    };

    return (
      <input
        ref={ref}
        value={value}
        onChange={handleChange}
        className={cn(
          "bg-background p-0 text-primary outline-none",
          "focus-within:outline-none focus-within:ring-transparent",
          className,
        )}
        {...rest}
      />
    );
  },
);

Input.displayName = "Input";
