import { ComponentProps, ReactNode } from "react";

interface ButtonProps extends ComponentProps<"button"> {
    children: ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <div>
      <button
       {...props}
        className="mb-7 w-full rounded-lg bg-indigo-600 p-3 text-white hover:bg-indigo-700 shadow-2xl shadow-indigo-500 transition duration-300"
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
