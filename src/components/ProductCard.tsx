import { IProduct } from "../Interfaces";
import { strSlice } from "../utils/functions";
import Button from "./ui/Button";
import Image from "./Image";
import CircleColor from "./ui/CircleColor";
interface IProps {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  openToEdit:()=>void;
}
const ProductCard = ({ product, setProductToEdit,openToEdit }: IProps) => {
  const { title, description, imageURL, category, colors } = product;
  const inputFieldColor = colors.map((color) => (
    <CircleColor key={color} color={color} />
  ));
  const handleEdit = () => {
    setProductToEdit(product);
    openToEdit();
  };
  return (
    <div className="max-w-sm md:max-w-lg border rounded-md p-2 flex flex-col">
      <Image
        imageUrl={imageURL}
        alt={"product image"}
        className="rounded-md w-full h-52 lg:object-cover "
      />
      <h2>{title}</h2>
      <p>{strSlice(description)}</p>
      <div className="flex my-3 space-x-2">{inputFieldColor}</div>
      <div className="flex items-center justify-between">
        <h4>{category.name}</h4>
        <Image
          imageUrl={category.imageURL}
          alt={"product name"}
          className="w-10 h-10 rounded-full object-scale-down"
        />
      </div>
      <div className="flex justify-between mt-4 space-x-2 items-center">
        <Button className=" bg-red-500">Delete</Button>
        <Button className=" bg-indigo-600" onClick={handleEdit}>
          Edit
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
