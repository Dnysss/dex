import { ComponentProps } from "react";
import { cn } from "../../../utils/cn";
import { Spinner } from "../Spinner";

interface ButtonProps extends ComponentProps<"button"> {
  isLoading?: boolean;
}

const Button = ({
  className,
  isLoading,
  disabled,
  children,
  ...props
}: ButtonProps) => {
  return (
    <div>
      <button
        {...props}
        disabled={disabled || isLoading}
        className={cn(
          "flex mb-7 w-full rounded-lg bg-indigo-600 p-3 text-white hover:bg-indigo-700 shadow-2xl shadow-indigo-500 transition duration-300 items-center justify-center",
          className
        )}
      >
        {!isLoading && children}
        {isLoading && <Spinner className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default Button;
