import { ComponentProps, forwardRef } from "react";

interface InputProps extends ComponentProps<"input"> {
  id: string;
  type: string;
  placeholder: string;
  label: string;
  icon?: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, type, placeholder, label, icon, value, onChange }) => {
    return (
      <div>
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-indigo-950"
        >
          {label}
        </label>
        <div className="relative mb-4 w-full">
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full rounded-lg bg-[#C6C7FF] p-4 text-sm outline-none focus:shadow-md focus:shadow-indigo-300"
          />
          {icon && (
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
              {icon}
            </span>
          )}
        </div>
      </div>
    );
  }
);

export default Input;
