import { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}
const Input = ({ ...rest }: IProps) => {
  return (
    <input 
    className="px-4 py-2 border-2 border-gray-300 rounded-lg bg-white text-gray-800 font-semibold shadow-md hover:bg-gray-200 hover:shadow-lg 
    focus:outline-none focus:ring-2
     focus:ring-gray-500 transition duration-300" 
    {...rest} 
  />
  

  );
};

export default Input;
