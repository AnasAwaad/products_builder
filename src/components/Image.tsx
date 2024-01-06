interface IProps {
  imageURl: string;
  alt: string;
  className?: string;
}

const Image = ({ imageURl, alt, className }: IProps) => {
  return <img src={imageURl} alt={alt} className={className} />;
};
export default Image;
