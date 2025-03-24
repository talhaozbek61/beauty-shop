import { useState } from "react";

import Button from "../../../components/ui/button";
import Input from "../../../components/ui/input";

export default function Modal({
  isOpen,
  setIsOpen,
  product,
  handleUpdateProduct,
}) {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  return (
    <>
      <div
        className={
          isOpen
            ? "absolute top-0 w-screen h-screen inset-0 bg-gray-900 opacity-10 z-10"
            : "hidden"
        }
        onClick={() => setIsOpen(false)}
      />

      <div
        className={
          isOpen
            ? "lg:w-1/3 md:w-1/2 w-3/4 min-h-min p-6 z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-200 dark:bg-gray-600 rounded-md space-y-4"
            : "hidden"
        }
      >
        <h1 className="text-2xl font-medium text-center">Edit Product</h1>

        {/* Product Name */}
        <Input
          name="product-name"
          placeholder="Product Name"
          type="text"
          value={updatedProduct?.name}
          onChange={(e) =>
            setUpdatedProduct({ ...updatedProduct, name: e?.target?.value })
          }
        >
          Name
        </Input>

        {/* Product Desc */}
        <Input
          name="product-desc"
          placeholder="Product Desc"
          type="text"
          value={updatedProduct?.desc}
          onChange={(e) =>
            setUpdatedProduct({ ...updatedProduct, desc: e?.target?.value })
          }
        >
          Description
        </Input>

        {/* Product Price */}
        <Input
          name="product-price"
          placeholder="Product Price"
          type="number"
          value={updatedProduct?.price}
          onChange={(e) =>
            setUpdatedProduct({ ...updatedProduct, price: e?.target?.value })
          }
        >
          Price
        </Input>

        {/* Product Image URL */}
        <Input
          name="product-image"
          placeholder="Image URL"
          type="text"
          value={updatedProduct?.image}
          onChange={(e) =>
            setUpdatedProduct({ ...updatedProduct, image: e?.target?.value })
          }
        >
          Image URL
        </Input>

        <div className="flex items-center gap-6">
          <Button
            type="submit"
            className="bg-gray-900 dark:bg-gray-400 text-white w-full"
            onClick={() => {
              handleUpdateProduct(product?._id, updatedProduct);
              setIsOpen(false);
            }}
          >
            Update
          </Button>
          <Button
            type="submit"
            className="bg-gray-500 dark:bg-gray-500 text-white w-full"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
}
