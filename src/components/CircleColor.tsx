import { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  bgColor: string;
}

const CircleColor = ({ bgColor, ...rest }: IProps) => {
  return (
    <span
      className=" rounded-full mr-2 w-5 h-5 cursor-pointer"
      style={{ backgroundColor: bgColor }}
      {...rest}
    />
  );
};
export default CircleColor;
