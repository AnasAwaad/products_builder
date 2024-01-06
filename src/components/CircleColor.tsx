interface IProps {
  bgColor: string;
}

const CircleColor = ({ bgColor }: IProps) => {
  return <span className={`w-5 h-5 rounded-full cursor-pointer ${bgColor}`} />;
};
export default CircleColor;
