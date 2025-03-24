import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useProductStore } from "../../store/product";

import { Toaster, toast } from "sonner";

import Container from "../../components/ui/container";
import Input from "../../components/ui/input";
import Button from "../../components/ui/button";

export default function Page() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    desc: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();

  let navigate = useNavigate();

  const handleSubmit = async () => {
    // console.log(newProduct);
    const { success, message } = await createProduct(newProduct);

    if (!success) toast.error(message);
    else {
      setNewProduct({ name: "", desc: "", price: "", image: "" });
      toast.success(message);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  return (
    <Container className="lg:max-w-xl space-y-6">
      <Toaster richColors />
      <h1 className="text-2xl font-medium text-center">Create New Product</h1>

      {/* Product Name */}
      <Input
        name="product-name"
        placeholder="Product Name"
        type="text"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      >
        Name
      </Input>

      {/* Product Desc */}
      <Input
        name="product-desc"
        placeholder="Product Desc"
        type="text"
        value={newProduct.desc}
        onChange={(e) => setNewProduct({ ...newProduct, desc: e.target.value })}
      >
        Description
      </Input>

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
      <Button
        type="submit"
        className="bg-gray-900 dark:bg-gray-700 text-white w-full"
        onClick={handleSubmit}
      >
        Send
      </Button>
    </Container>
  );
}
