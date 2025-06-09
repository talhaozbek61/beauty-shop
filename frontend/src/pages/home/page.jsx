import { useEffect } from "react";

import { useProductStore } from "../../store/product";

import Container from "../../components/ui/container";
import ProductList from "./_components/products-list";
import Link from "../../components/ui/link";

export default function Page() {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // console.log(products);

  return (
    <Container>
      {products.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products?.map((product) => (
            <ProductList key={product?._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-red-400">Products not found</p>
          <Link href="/create">Create Product</Link>
        </div>
      )}
    </Container>
  );
}
