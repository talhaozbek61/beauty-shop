import { useState } from "react";

import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";

import Link from "../../../components/ui/link";
import Button from "../../../components/ui/button";
import Input from "../../../components/ui/input";
import SelectMenu from "../../../components/ui/select-menu";
import Textarea from "../../../components/ui/textarea";

import Modal from "./modal";

import { categories } from "../../../../../shared/constants/categories";

export default function ProductList({ product }) {
  const [isOpen, setIsOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);

  return (
    <>
      <div className="group relative overflow-hidden">
        <img
          alt={product?.name}
          src={product?.image}
          className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
        />
        <div className="mt-4 flex justify-between">
          <Link
            className="text-sm hover:text-gray-900 truncate"
            href={`/product/${product?._id}`}
          >
            <span aria-hidden="true" className="absolute inset-0" />
            {product?.name}
          </Link>
          <p className="text-sm font-medium">${product?.price}</p>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
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

        {/* Product Category */}
        <SelectMenu
          name="product-category"
          values={categories}
          defaultValue={updatedProduct.category}
          onChange={(e) =>
            setUpdatedProduct({ ...updatedProduct, category: e.target.value })
          }
        >
          Category
        </SelectMenu>

        {/* Product Desc */}
        <Textarea
          name="product-desc"
          rows={3}
          value={updatedProduct.desc}
          placeholder="Product Desc"
          onChange={(e) =>
            setUpdatedProduct({ ...updatedProduct, desc: e.target.value })
          }
        >
          Description
        </Textarea>

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
            className="bg-transparent ring-1 ring-foreground text-foreground w-full"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-foreground text-primary w-full"
            onClick={() => setIsOpen(false)}
          >
            Update
          </Button>
        </div>
      </Modal>
    </>
  );
}
