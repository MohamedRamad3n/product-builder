import { ButtonHTMLAttributes } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className: string;
}
const Button = ({ children, className, ...rest }: IProps) => {
  return (
    <button
      className={`${className} rounded-md p-1 text-white w-full`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
