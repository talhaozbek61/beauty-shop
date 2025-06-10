import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { House, Pencil, Lock, Trash, ShoppingBag } from "lucide-react";

import { useProductStore } from "../../store/product";
import { useAuthStore } from "../../store/auth";
import { useCartStore } from "../../store/cart";

import { categories } from "../../../../shared/constants/categories";

import Container from "../../components/ui/container";
import Link from "../../components/ui/link";
import Button from "../../components/ui/button";
import Modal from "../home/_components/modal";
import Input from "../../components/ui/input";
import SelectMenu from "../../components/ui/select-menu";
import Textarea from "../../components/ui/textarea";

import { toast, Toaster } from "sonner";

export default function Page() {
  const { fetchProductById, product, updateProduct, deleteProduct } =
    useProductStore();
  const { user } = useAuthStore();
  const { addToCart } = useCartStore();

  const [isOpen, setIsOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const { id } = useParams();
  let navigate = useNavigate();

  // Update Product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const { success, message } = await updateProduct(
      product?._id,
      updatedProduct
    );

    if (!success) toast.error(message);
    else {
      await fetchProductById(product?._id);
      toast.success("Product Updated");
    }
  };

  // Delete Product
  const handleDelete = async () => {
    const { success, message } = await deleteProduct(product._id);

    if (!success) toast.error(message);
    else {
      toast.success(message);
      setTimeout(() => {
        navigate("/account");
      }, 1000);
    }
  };

  // Added Cart
  const handleCart = async () => {
    const { success, message } = await addToCart(user?._id, product?._id);
    if (!success) toast.error(message);
    else toast.success(message);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetchProductById(id);
      if (!res.success) navigate("/not-found");
    };
    fetchProduct();
  }, [fetchProductById, id]);

  useEffect(() => {
    if (product) setUpdatedProduct(product);
  }, [product]);

  return (
    <>
      <Toaster position="bottom-center" />

      <Container className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Product details */}
        <div className="lg:self-end">
          <img
            alt={product?.name}
            src={product?.image}
            className="aspect-square w-full rounded-lg object-cover"
          />
        </div>

        {/* Product image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-start lg:max-w-lg relative dark:text-foreground">
          <div className="flex items-center gap-1 text-sm font-medium max-lg:hidden">
            <Link href="/" className="flex items-center gap-1">
              <House className="size-3.5" />
              Home
            </Link>
            <span>/</span>
            <span className="truncate">{product?.name}</span>
          </div>

          <h1 className="mt-10 text-2xl font-bold tracking-tight sm:text-3xl">
            {product?.name}
          </h1>

          <section className="mt-4 space-y-4">
            <p className="text-lg sm:text-xl">${product?.price}</p>
            <p className="text-base text-gray-400 dark:text-gray-200">
              {product?.desc}
            </p>
          </section>
          {user ? (
            user?._id === product.userId ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <Button
                  className="rounded-md text-xs font-semibold w-full ring-1 ring-gray-300 ring-inset hover:bg-gray-50 flex justify-center items-center gap-1.5"
                  onClick={() => setIsOpen(true)}
                >
                  <Pencil className="size-4" />
                  Edit
                </Button>

                <Button
                  className="rounded-md text-xs text-foreground font-semibold w-full bg-primary dark:bg-foreground dark:text-gray-900 flex justify-center items-center gap-1.5"
                  onClick={handleDelete}
                >
                  <Trash className="size-4" />
                  Delete
                </Button>

                <Button
                  className="sm:col-span-2 rounded-md text-xs font-semibold w-full ring-1 ring-gray-300 ring-inset hover:bg-gray-50 dark:text-gray-900 flex justify-center items-center gap-1.5"
                  disabled={true}
                >
                  <Lock className="size-4" />
                  You can't buy your own product
                </Button>
              </div>
            ) : (
              <Button
                className="rounded-md text-xs font-semibold w-full ring-1 ring-gray-300 ring-inset hover:bg-gray-50 flex justify-center items-center gap-1.5 mt-4"
                onClick={handleCart}
              >
                <ShoppingBag className="size-4" />
                Add Cart
              </Button>
            )
          ) : (
            <Button
              className="rounded-md text-xs font-semibold w-full ring-1 ring-gray-300 ring-inset hover:bg-gray-50 flex justify-center items-center gap-1.5 mt-4"
              disabled={true}
            >
              <ShoppingBag className="size-4" />
              Log in to purchase the product.
            </Button>
          )}
        </div>
      </Container>

      {/* Modal */}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <h1 className="text-2xl font-medium text-center">Edit Product</h1>

        {/* Form */}
        <form onSubmit={handleUpdateProduct} className="space-y-4">
          {/* Product Name */}
          <Input
            name="product-name"
            placeholder="Product Name"
            type="text"
            value={updatedProduct?.name}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, name: e.target.value })
            }
          >
            Name
          </Input>

          {/* Product Category */}
          <SelectMenu
            name="product-category"
            values={categories}
            defaultValue={updatedProduct?.category}
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
            value={updatedProduct?.desc}
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
              setUpdatedProduct({ ...updatedProduct, price: e.target.value })
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
              setUpdatedProduct({ ...updatedProduct, image: e.target.value })
            }
          >
            Image URL
          </Input>

          {/* Modal Buttons */}
          <div className="flex items-center gap-6">
            <Button
              className="bg-transparent ring-1 ring-foreground text-foreground dark:hover:text-foreground w-full"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-foreground text-primary dark:text-gray-900 w-full"
              onClick={() => setIsOpen(false)}
            >
              Update
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
