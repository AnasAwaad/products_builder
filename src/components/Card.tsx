import { ICategory, IProduct } from "../interfaces";
import { txtSlicer } from "../utils/functions";
import CircleColor from "./CircleColor";
import Image from "./Image";
import Button from "./ui/Button";

interface IProps {
  product: IProduct;
  products: IProduct[];
  openEditModal: () => void;
  productIdx: number;
  setSelected: (ele: ICategory) => void;
  setProductToEdit: (ele: IProduct) => void;
  setProducts: (ele: IProduct[]) => void;
  setProduct: (ele: IProduct) => void;
  setProductColor: (ele: string[]) => void;
  setProductIdx: (ele: number) => void;
}
const Card = ({
  product,
  openEditModal,
  products,
  productIdx,
  setSelected,
  setProducts,
  setProductColor,
  setProductToEdit,
  setProductIdx,
}: IProps) => {
  const { category, imageURL, price, title, description, colors, id } = product;

  /* --------- HANDLE ---------- */
  const onEditHandler = () => {
    setProductColor(product.colors);
    setProductToEdit(product);
    setSelected(product.category);
    openEditModal();
    setProductIdx(productIdx);
  };

  const onRemoveHandler = () => {
    if (products.find((item) => item.id == id)) {
      setProducts(products.filter((item) => item.id != id));
    }
  };

  return (
    <div className="border p-2 max-w-[410px] mx-auto">
      <Image
        imageURl={imageURL}
        alt={title}
        className={"rounded-md w-[320px] h-[220px]"}
      />

      <h3 className="font-semibold text-lg my-3">{title}</h3>

      <p className="text-gray-700 text-sm">{txtSlicer(description, 80)}</p>

      <div className="flex mt-3">
        {colors.map((color) => (
          <CircleColor key={color} bgColor={color} />
        ))}
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
        <Button
          className="bg-indigo-700 hover:bg-indigo-900"
          onClick={onEditHandler}
        >
          Edit
        </Button>
        <Button
          className="bg-[#c2344d] hover:bg-red-700"
          onClick={onRemoveHandler}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};
export default Card;
