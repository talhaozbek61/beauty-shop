import { useEffect } from "react";

import { useAuthStore } from "../../store/auth";
import { useProductStore } from "../../store/product";

import Container from "../../components/ui/container";
import Heading from "./_components/heading";
import Cta from "./_components/cta";

import ProductList from "../home/_components/products-list";
import Link from "../../components/ui/link";
import { Plus } from "lucide-react";

export default function Page() {
  const { logout, user, updateUser } = useAuthStore();
  const { products, fetchProductsByUserId } = useProductStore();

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    const fetchProducts = async (id) => (id ? fetchProductsByUserId(id) : null);

    fetchProducts(user?._id);
  }, [user, updateUser]);

  return (
    <Container>
      <Heading user={user} updateUser={updateUser} onClick={handleLogout} />
      {products.length > 0 ? (
        <div className="py-12">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight dark:text-foreground">
              Your Products
            </h1>
            <Link
              href="/create"
              className="rounded-md text-xs font-semibold px-4 py-2.5 ring-1 ring-gray-300 ring-inset hover:bg-primary hover:text-foreground hover:ring-0 duration-300 flex items-center gap-1.5"
            >
              <Plus className="size-3" />
              <span className="max-sm:hidden">Create New Product</span>
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products?.map((product) => (
              <ProductList key={product?._id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <Cta />
      )}
    </Container>
  );
}
