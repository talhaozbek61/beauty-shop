import { useState } from "react";

import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";

import Button from "../../../components/ui/button";
import Link from "../../../components/ui/link";

import Modal from "./modal";

export default function ProductList({
  handleDelete,
  product,
  handleUpdateProduct,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="group relative overflow-hidden">
        <Button
          className="mt-2 absolute w-min h-min -translate-x-20 group-hover:translate-x-4 duration-500 z-10 bg-gray-400 p-2 text-white"
          onClick={() => handleDelete(product?._id)}
        >
          <Trash2 size={18} />
        </Button>
        <Button
          className="mt-2 absolute w-min h-min -translate-x-20 group-hover:translate-x-14 duration-500 z-10 bg-gray-400 p-2 text-white"
          onClick={() => setIsOpen(true)}
        >
          <Pencil size={18} />
        </Button>
        <img
          alt={product?.name}
          src={product?.image}
          className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
        />
        <div className="mt-4 flex justify-between">
          <Link className="text-sm" href={`/product/${product?._id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product?.name}
          </Link>
          <p className="text-sm font-medium">{product?.price} TL</p>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        product={product}
        handleUpdateProduct={handleUpdateProduct}
      />
    </div>
  );
}
