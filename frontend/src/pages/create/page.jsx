import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useProductStore } from "../../store/product";

import { Toaster, toast } from "sonner";

import Container from "../../components/ui/container";
import Input from "../../components/ui/input";
import Button from "../../components/ui/button";
import SelectMenu from "../../components/ui/select-menu";
import Textarea from "../../components/ui/textarea";
import { useAuthStore } from "../../store/auth";

import { categories } from "../../../../shared/constants/categories";

export default function Page() {
  const { createProduct } = useProductStore();
  const { user } = useAuthStore();

  const [newProduct, setNewProduct] = useState({
    name: "",
    userId: user?._id,
    category: "",
    desc: "",
    price: "",
    image: "",
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newProduct);
    const { success, message } = await createProduct(newProduct);

    if (!success) toast.error(message);
    else {
      setNewProduct({
        name: "",
        userId: user?._id,
        category: "",
        desc: "",
        price: "",
        image: "",
      });
      toast.success(message);
      setTimeout(() => {
        navigate("/account");
      }, 1500);
    }
  };

  return (
    <Container className="lg:max-w-lg space-y-6 px-4">
      <Toaster position="bottom-center" />

      {/* Header */}
      <h1 className="text-2xl font-semibold mb-6 text-center text-primary">
        Create New Product
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <Input
          name="product-name"
          placeholder="Product Name"
          type="text"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        >
          Name
        </Input>

        {/* Product Category */}
        <SelectMenu
          name="product-category"
          values={categories}
          defaultValue={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
        >
          Category
        </SelectMenu>

        {/* Product Desc */}
        <Textarea
          name="product-desc"
          rows={3}
          value={newProduct.desc}
          placeholder="Product Desc"
          onChange={(e) =>
            setNewProduct({ ...newProduct, desc: e.target.value })
          }
        >
          Description
        </Textarea>

        {/* Product Price */}
        <Input
          name="product-price"
          placeholder="Product Price"
          type="number"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        >
          Price
        </Input>

        {/* Product Image URL */}
        <Input
          name="product-image"
          placeholder="Image URL"
          type="text"
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.value })
          }
        >
          Image URL
        </Input>

        {/* Send Button */}
        <Button
          type="submit"
          className="bg-primary dark:bg-gray-700 text-white w-full rounded-md"
        >
          Send
        </Button>
      </form>
    </Container>
  );
}
