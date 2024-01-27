import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?: "w-fit" | "w-full";
}

const Button = ({ children, className, width = "w-full", ...rest }: IProps) => {
  return (
    <button
      {...rest}
      className={`p-3 rounded-md text-white  text-lg ${className} ${width}`}
    >
      {children}
    </button>
  );
};
export default Button;
