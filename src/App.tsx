import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { categories, colors, formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { ICategory, IProduct } from "./Interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ui/ErrorMessage";
import CircleColor from "./components/ui/CircleColor";
import { v4 as uuid } from "uuid";
import Select from "./components/ui/Select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const notifySuccess = (message: string) => toast.success(message);
  const defaultProductObj = {
    id: "",
    title: "",
    price: "",
    imageURL: "",
    description: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenToEdit, setIsOpenToEdit] = useState(false);
  const [isOpenToDelete, setIsOpenToDelete] = useState(false);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [productToUpdateIdx, setProductToUpdateIdx] = useState<number>(0);
  const [productToEdit, setProductToEdit] =
    useState<IProduct>(defaultProductObj);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    price: "",
    imageURL: "",
  });
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [selectedCategory, setSelectedCategory] = useState<ICategory>(
    categories[0]
  );

  function open() {
    setIsOpen(true);
  }
  function close() {
    setIsOpen(false);
  }
  function openToEdit() {
    setIsOpenToEdit(true);
  }
  function closeToEdit() {
    setIsOpenToEdit(false);
  }
  function openToDelete() {
    setIsOpenToDelete(true);
  }
  function closeToDelete() {
    setIsOpenToDelete(false);
  }
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const onChangeHandlerToEdit = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const { title, description, price, imageURL } = product;
    const errors = productValidation({
      title,
      description,
      price,
      imageURL,
    });
    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");
    console.log(hasErrorMsg);
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    setProducts((prev) => [
      {
        ...product,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);
    setProduct(defaultProductObj);
    setTempColors([]);
    notifySuccess("Product added successfully!");
    setTimeout(() => {
      close();
    }, 1500);
  }
  function handleSubmitToEdit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const { title, description, price, imageURL } = productToEdit;
    const errors = productValidation({
      title,
      description,
      price,
      imageURL,
    });
    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    const updatedProducts = [...products];
    updatedProducts[productToUpdateIdx] = {
      ...productToEdit,
      colors: tempColors.concat(productToEdit.colors),
    };
    setProducts(updatedProducts);
    setTempColors([]);
    closeToEdit();
  }
  function onCancel() {
    setProduct(defaultProductObj);
    close();
  }
  const removeProductHandler = () => {
    const filtered = products.filter(
      (product) => product.id !== productToEdit.id
    );
    setProducts(filtered);
    console.log(products);
    notifySuccess("Product removed successfully!");
    closeToDelete();
  };
  const input = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label
        htmlFor={input.id}
        className="mb-[1px] text-sm font-medium text-gray-700"
      >
        {input.label}
      </label>
      <Input
        type="text"
        name={input.name}
        id={input.id}
        onChange={onChangeHandler}
        value={product[input.name]}
      />
      <ErrorMessage msg={errors[input.name]} />
    </div>
  ));
  const inputToEdit = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label
        htmlFor={input.id}
        className="mb-[1px] text-sm font-medium text-gray-700"
      >
        {input.label}
      </label>
      <Input
        type="text"
        name={input.name}
        id={input.id}
        onChange={onChangeHandlerToEdit}
        value={productToEdit[input.name]}
      />
      <ErrorMessage msg={errors[input.name]} />
    </div>
  ));
  const inputFieldColor = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
          return;
        }
        if (productToEdit.colors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempColors((prev) => [...prev, color]);
      }}
    />
  ));
  return (
    <main className="container  mx-auto ">
      <ToastContainer position="top-right" autoClose={3000} />
      <Button
        className="block w-fit bg-indigo-700 hover:bg-indigo-800 mx-auto my-10 px-10 font-medium"
        onClick={open}
      >
        Build A Product
      </Button>
      {/*Modal To Add Product */}
      <Modal close={close} title="Add A New Product" isOpen={isOpen}>
        <form className="space-y-3" onSubmit={handleSubmit}>
          {input}
          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <div className="flex mb-3 items-center space-x-3 flex-wrap">
            {inputFieldColor}
          </div>
          <div className="flex mb-3 items-center space-x-3 flex-wrap">
            {tempColors &&
              tempColors.map((color) => {
                return (
                  <span
                    className="m-1 rounded-md text-white"
                    style={{ backgroundColor: color }}
                  >
                    {color}
                  </span>
                );
              })}
          </div>
          <div className="flex mb-3 items-center space-x-3">
            <Button className="bg-blue-700 hover:bg-blue-800">Submit</Button>
            <Button
              className="bg-gray-500 hover:bg-gray-400"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      {/* Modal To Edit Product*/}
      <Modal close={closeToEdit} title="Edit Product" isOpen={isOpenToEdit}>
        <form className="space-y-3" onSubmit={handleSubmitToEdit}>
          {inputToEdit}
          <Select
            selected={productToEdit.category}
            setSelected={(value) =>
              setProductToEdit({ ...productToEdit, category: value })
            }
          />
          <div className="flex mb-3 items-center space-x-3 flex-wrap">
            {tempColors.concat(productToEdit.colors).map((color, index) => {
              return (
                <span
                  key={index}
                  className="m-1 rounded-md text-white"
                  style={{ backgroundColor: color }}
                >
                  {color}
                </span>
              );
            })}
          </div>
          <div className="flex mb-3 items-center space-x-3 flex-wrap">
            {inputFieldColor}
          </div>
          <div className="flex mb-3 items-center space-x-3">
            <Button className="bg-blue-700 hover:bg-blue-800">Edit</Button>
            <Button
              className="bg-gray-500 hover:bg-gray-400"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      {/*Modal To Deleted */}
      <Modal
        close={closeToDelete}
        title="Remove Product"
        isOpen={isOpenToDelete}
      >
        <div className="space-y-4 p-4 text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Are you sure you want to remove this product?
          </h2>
          <p className="text-sm text-gray-600">
            This action cannot be undone. The product will be permanently
            deleted from your inventory.
          </p>

          <div className="flex justify-center space-x-3 mt-4">
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={removeProductHandler}
            >
              Yes, Remove
            </Button>
            <Button
              className="bg-gray-500 hover:bg-gray-400 text-white"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2 rounded-md">
        {products.map((product, index) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              setProductToEdit={setProductToEdit}
              openToEdit={openToEdit}
              openToDelete={openToDelete}
              index={index}
              setProductToUpdateIdx={setProductToUpdateIdx}
            />
          );
        })}
      </div>
    </main>
  );
};

export default App;
