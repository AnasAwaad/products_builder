import toast from 'react-hot-toast';
import { ICategory, IProduct } from '../interfaces';
import { txtSlicer } from '../utils/functions';
import CircleColor from './CircleColor';
import Image from './Image';
import Button from './ui/Button';
import Modal from './ui/Modal';
import { useState } from 'react';

interface IProps {
  product: IProduct;
  products: IProduct[];
  productIdx: number;
  openEditModal: () => void;
  setSelected: (ele: ICategory) => void;
  setProductToEdit: (ele: IProduct) => void;
  setProducts: (ele: IProduct[]) => void;
  setProduct: (ele: IProduct) => void;
  setProductColor: (ele: string[]) => void;
  setProductIdx: (ele: number) => void;
}
const Card = ({ product, openEditModal, products, productIdx, setSelected, setProducts, setProductColor, setProductToEdit, setProductIdx }: IProps) => {
  const { category, imageURL, price, title, description, colors } = product;

  /* STATE */
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  /* --------- HANDLER ---------- */
  const removeProductNotify = () =>
    toast('product removed successfuly', {
      duration: 3000,
      position: 'top-center',

      icon: '👏',
    });
  const onEditHandler = () => {
    setProductColor(product.colors);
    setProductToEdit(product);
    setSelected(product.category);
    openEditModal();
    setProductIdx(productIdx);
  };

  const onRemoveHandler = () => {
    setProductToEdit(product);
    setProducts(products.filter((item) => item.id != product.id));
    removeProductNotify();
  };

  return (
    <div className="border p-2 max-w-[410px] mx-auto">
      <Image imageURl={imageURL} alt={title} className={'rounded-md w-[320px] h-[220px]'} />

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

          <Image imageURl={category.imageURL} alt="product name" className="w-10 h-10 rounded-full" />
        </div>
      </div>
      <Modal closeModal={closeModal} isOpen={isOpen} title={'Are you sure you want to remove this Product from your Store?'}>
        <p className="text-gray-600 text-sm mt-3">
          Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the
          intended action.
        </p>
        <form className="space-y-3" onSubmit={onRemoveHandler}>
          <div className="mt-4 flex items-center space-x-3 ">
            <Button className="bg-[#c2344d] hover:bg-red-700">Yes, remove</Button>
            <Button type="reset" className="bg-[#f5f5fa] hover:bg-gray-300 text-black w-full rounded-lg  px-3 py-3 duration-200 font-medium" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      <div className="flex items-center justify-between space-x-3">
        <Button className="bg-indigo-700 hover:bg-indigo-900" onClick={onEditHandler}>
          Edit
        </Button>
        <Button className="bg-[#c2344d] hover:bg-red-700" onClick={openModal}>
          Remove
        </Button>
      </div>
    </div>
  );
};
export default Card;
