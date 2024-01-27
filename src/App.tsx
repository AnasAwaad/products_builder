import { ChangeEvent, FormEvent, useState } from "react";
import Card from "./components/Card";
import Modal from "./components/ui/Modal";
import {
  categories,
  colors,
  emptyFormInput,
  emptyProduct,
  formInputsList,
  productList,
} from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { errorValidation } from "./validation";
import CircleColor from "./components/CircleColor";
import { ICategory, IError, IProduct } from "./interfaces";
import Selection from "./components/ui/Selection";

// interface IProps {}

const App = () => {
  /* ------- STATE ------- */
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [product, setProduct] = useState<IProduct>(emptyProduct);
  const [errorMessage, setErrorMessage] = useState(emptyFormInput);
  const [productColor, setProductColor] = useState<string[]>([]);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [productToEdit, setProductToEdit] = useState<IProduct>(emptyProduct);
  const [selected, setSelected] = useState<ICategory>(categories[0]);
  const [productIdx, setProductIdx] = useState<number>(0);

  /* ------- HANDLER -------  */
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);
  const openEditModal = () => setIsEditModalOpen(true);
  const errorHandler = (error: IError) => {
    const hasError =
      Object.values(error).some((item) => item == "") &&
      Object.values(error).every((item) => item == "");

    if (!hasError) return true;

    return false;
  };

  const addNewProductHandler = () => {
    setProducts((prev) => [
      {
        ...product,
        colors: productColor,
        category: { imageURL: selected.imageURL, name: selected.name },
      },
      ...prev,
    ]);
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

  const onChangeToEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });

    setErrorMessage({
      ...errorMessage,
      [name]: "",
    });
  };

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const error = errorValidation(product);
    if (errorHandler(error)) {
      setErrorMessage(error);
      return;
    }

    addNewProductHandler();

    setProduct(emptyProduct);
    setProductColor([]);
    closeModal();
  };

  const onEditProductHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const error = errorValidation(productToEdit);
    if (errorHandler(error)) {
      setErrorMessage(error);
      return;
    }
    productToEdit.category = selected;
    productToEdit.colors = productColor;
    products[productIdx] = productToEdit;

    setProductToEdit(emptyProduct);
    setProductColor([]);
    closeEditModal();
  };

  /* ------- RENDER -------  */
  const renderProductList = products.map((product, idx) => (
    <Card
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      products={products}
      setProduct={setProduct}
      setProducts={setProducts}
      setSelected={setSelected}
      setProductColor={setProductColor}
      openEditModal={openEditModal}
      productIdx={idx}
      setProductIdx={setProductIdx}
    />
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

  const renderFormEditInput = formInputsList.map((input) => {
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
          value={productToEdit[name]}
          onChange={onChangeToEditHandler}
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

      <Modal
        closeModal={closeModal}
        isOpen={isOpen}
        title={"ADD A NEW PRODUCT"}
      >
        <form className="space-y-3" onSubmit={onSubmitHandler}>
          {renderFormInput}
          <Selection selected={selected} setSelected={setSelected} />
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
              type="reset"
              className="bg-[#c2344d] hover:bg-red-700"
              onClick={closeModal}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      {/* this model shown when clicked to edit button on the card  */}
      <Modal
        closeModal={closeEditModal}
        isOpen={isEditModalOpen}
        title={"EDIT THIS PRODUCT"}
      >
        <form className="space-y-3" onSubmit={onEditProductHandler}>
          {renderFormEditInput}
          <Selection selected={selected} setSelected={setSelected} />
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
            <Button className="bg-indigo-700 hover:bg-indigo-900">Edit</Button>
            <Button
              type="reset"
              className="bg-[#c2344d] hover:bg-red-700"
              onClick={closeEditModal}
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
