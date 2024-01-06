import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className: string;
}

const Button = ({ children, className, ...rest }: IProps) => {
  return (
    <button
      {...rest}
      className={`p-3 w-full rounded-md text-white text-lg ${className}`}
    >
      {children}
    </button>
  );
};
export default Button;
