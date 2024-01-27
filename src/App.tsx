import { ChangeEvent, FormEvent, useState } from "react";
import Card from "./components/Card";
import Modal from "./components/ui/Modal";
import { colors, formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { errorValidation } from "./validation";
import CircleColor from "./components/CircleColor";
import { IProduct } from "./interfaces";

// interface IProps {}

const App = () => {
  const emptyFormInput = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };
  const emptyProduct = {
    id: "3",
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };

  /* ------- STATE ------- */
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<IProduct>(emptyProduct);
  const [errorMessage, setErrorMessage] = useState(emptyFormInput);
  const [productColor, setProductColor] = useState<string[]>([]);
  const [products, setProducts] = useState<IProduct[]>(productList);

  /* ------- HANDLER -------  */
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const error = errorValidation(product);

    const hasError =
      Object.values(error).some((item) => item == "") &&
      Object.values(error).every((item) => item == "");

    if (!hasError) {
      setErrorMessage(error);

      return;
    }
    setProducts((prev) => [
      {
        ...product,
        colors: productColor,
        category: { imageURL: product.imageURL, name: product.title },
      },
      ...prev,
    ]);
    setProduct(emptyProduct);
    setProductColor([]);
    closeModal();
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
    setErrorMessage({
      ...errorMessage,
      [name]: "",
    });
  };

  const productColorHandler = (color: string) => {
    setProductColor((prev) => {
      if (productColor.includes(color)) {
        return productColor.filter((item) => item != color);
      } else {
        return [...prev, color];
      }
    });
  };

  /* ------- RENDER -------  */
  const renderProductList = products.map((product) => (
    <Card key={product.id} product={product} openModal={openModal} />
  ));

  const renderFormInput = formInputsList.map((input) => {
    const { label, type, id, name } = input;
    return (
      <div key={id} className="flex flex-col">
        <label className="mb-[2px] text-sm font-medium text-gray-700">
          {label}
        </label>
        <Input
          type={type}
          name={name}
          id={id}
          value={product[name]}
          onChange={onChangeHandler}
        />
        <p className="text-red-500 text-md font-semibold text-sm">
          {errorMessage[name]}
        </p>
      </div>
    );
  });

  const renderProductColor = colors.map((color) => (
    <CircleColor
      key={color}
      bgColor={color}
      onClick={() => productColorHandler(color)}
    />
  ));

  return (
    <div className="container mx-auto">
      <Button
        className="bg-indigo-700 hover:bg-indigo-900 flex m-auto my-5 "
        width="w-fit"
        onClick={openModal}
      >
        Add Product
      </Button>
      <Modal closeModal={closeModal} isOpen={isOpen}>
        <form className="space-y-3" onSubmit={onSubmitHandler}>
          {renderFormInput}
          <div className="flex flex-wrap ">
            {productColor.map((item) => (
              <span
                key={item}
                className="mr-2 rounded-md text-white px-2 my-1"
                style={{ backgroundColor: item }}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap">{renderProductColor}</div>
          <div className="mt-4 flex items-center space-x-3 ">
            <Button className="bg-indigo-700 hover:bg-indigo-900">
              Submit
            </Button>
            <Button
              className="bg-[#c2344d] hover:bg-red-700"
              onClick={closeModal}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
        {renderProductList}
      </div>
    </div>
  );
};
export default App;
