import { useEffect } from "react";

import { useProductStore } from "../../store/product";

import { Toaster, toast } from "sonner";

import Container from "../../components/ui/container";
import ProductList from "./_components/products-list";
import Link from "../../components/ui/link";

export default function Page() {
  const { fetchProducts, products, deleteProduct, updateProduct } =
    useProductStore();

  const handleDelete = async (id) => {
    const { success, message } = await deleteProduct(id);
    if (!success) toast.error(message);
    else toast.success(message);
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    const { success, message } = await updateProduct(id, updatedProduct);

    if (!success) toast.error(message);
    else toast.success("Product Updated");
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, handleDelete, handleUpdateProduct]);

  // console.log(products);

  return (
    <Container>
      <Toaster richColors />
      {products.length > 0 ? (
        <>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products?.map((product) => (
              <ProductList
                key={product?._id}
                product={product}
                handleDelete={handleDelete}
                handleUpdateProduct={handleUpdateProduct}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-red-400">Products not found</p>
          <Link href="/create">Create Product</Link>
        </div>
      )}
    </Container>
  );
}
