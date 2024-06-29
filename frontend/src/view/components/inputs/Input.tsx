import { IoIosCloseCircleOutline } from "react-icons/io";
import { ComponentProps, forwardRef } from "react";
import { cn } from "../../../utils/cn";

interface InputProps extends ComponentProps<"input"> {
  name: string;
  label: string;
  icon?: React.ReactNode;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, className, label, icon, name, error, ...props }, ref) => {
    const inputId = id ?? name;
    return (
      <div>
        <label
          htmlFor={inputId}
          className="block mb-2 text-sm font-medium text-indigo-950"
        >
          {label}
        </label>
        <div className="relative mb-2 w-full">
          <input
            {...props}
            ref={ref}
            id={inputId}
            name={name}
            className={cn(
              "w-full rounded-lg bg-[#C6C7FF] p-3 text-sm outline-none focus:shadow-md focus:shadow-indigo-300",
              error && "!border-red-900",
              className
            )}
          />
          {icon && (
            <span className="absolute inset-y-0 right-3 flex items-center h-11 text-gray-500">
              {icon}
            </span>
          )}
          
          {error && (
            <div className="mt-2 flex gap-2 items-center text-red-900">
              <IoIosCloseCircleOutline />
              <span className="text-xs">{error}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
