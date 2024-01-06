import { IProduct } from "../interfaces";
import CircleColor from "./CircleColor";
import Image from "./Image";
import Button from "./ui/Button";

interface IProps {
  product: IProduct;
}
const Card = ({ product }: IProps) => {
  const { category, imageURL, price, title, description } = product;

  return (
    <div className="border p-2 max-w-[410px] mx-auto">
      <Image
        imageURl={imageURL}
        alt="product name"
        className={"rounded-md w-[320px] h-[220px]"}
      />

      <h3 className="font-semibold text-lg my-3">{title}</h3>

      <p className="text-gray-700 text-sm">
        {description.length > 50
          ? `${description.slice(0, 80)} ...`
          : description}
      </p>

      <div className="flex space-x-1 mt-3">
        <CircleColor bgColor=" bg-red-600 "></CircleColor>
        <CircleColor bgColor=" bg-yellow-500 "></CircleColor>
        <CircleColor bgColor=" bg-blue-500 "></CircleColor>
      </div>

      <div className="flex items-center justify-between my-4">
        <span className="text-sky-600 text-xl font-semibold">{price}$</span>
        <div className="flex items-center gap-2">
          <span>{category.name}</span>

          <Image
            imageURl={category.imageURL}
            alt="product name"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>

      <div className="flex items-center justify-between space-x-3">
        <Button className="bg-indigo-700 hover:bg-indigo-900">Edit</Button>
        <Button className="bg-[#c2344d] hover:bg-red-700">Remove</Button>
      </div>
    </div>
  );
};
export default Card;
