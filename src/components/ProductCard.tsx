import { IProduct } from "../Interfaces";
import { strSlice } from "../utils/functions";
import Button from "./ui/Button";
import Image from "./Image";
import CircleColor from "./ui/CircleColor";

interface IProps {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  openToEdit: () => void;
  openToDelete:()=>void;
  index: number;
  setProductToUpdateIdx: (index: number) => void;
}
const ProductCard = ({
  product,
  setProductToEdit,
  openToEdit,
  openToDelete,
  setProductToUpdateIdx,
  index,
}: IProps) => {
  const { title, description, imageURL, category, colors, price } = product;

  const inputFieldColor = colors.map((color) => (
    <CircleColor key={color} color={color} />
  ));

  const handleEdit = () => {
    setProductToEdit(product);
    setProductToUpdateIdx(index);
    openToEdit();
  };
  const handleRemove = ()=>{
    setProductToEdit(product);
    openToDelete();
  }
  return (
    <div className="max-w-sm md:max-w-lg border rounded-md p-2 flex flex-col h-full">
      <div className="flex-grow">
        <Image
          imageUrl={imageURL}
          alt="product image"
          className="rounded-md w-full h-52 lg:object-cover"
        />
        <h2>{title}</h2>
        <p>{strSlice(description)}</p>
        <div className="flex my-3 space-x-2">{inputFieldColor}</div>
        <div className="flex items-center justify-between">
          <h4>{`$${price}`}</h4>
          <div className="flex items-center space-x-1">
            <h4>{category.name}</h4>
            <Image
              imageUrl={category.imageURL}
              alt="product name"
              className="w-10 h-10 rounded-full object-fill"
            />
          </div>
        </div>
      </div>

      {/* Footer with buttons always at the bottom */}
      <div className="mt-auto flex justify-between space-x-2 items-center border-t pt-2">
        <Button className="bg-red-500" onClick={handleRemove}>
          Delete
        </Button>
        <Button className="bg-indigo-600" onClick={handleEdit}>
          Edit
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
