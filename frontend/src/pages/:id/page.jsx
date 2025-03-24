import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { House } from "lucide-react";

import { useProductStore } from "../../store/product";

import Container from "../../components/ui/container";
import Link from "../../components/ui/link";

export default function Page() {
  const { id } = useParams();
  let navigate = useNavigate();

  const { fetchProductById, product } = useProductStore();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetchProductById(id);
      if (!res.success) navigate("/not-found");
    };

    fetchProduct();
  }, [fetchProductById]);

  return (
    <Container className="lg:grid lg:grid-cols-2 lg:gap-x-8">
      {/* Product details */}
      <div className="lg:max-w-lg lg:self-end">
        <Link href="/" className="flex items-center gap-1.5">
          <House size={18} />
          Go Home
        </Link>
        <h1 className="mt-10 text-3xl font-bold tracking-tight sm:text-4xl">
          {product?.name}
        </h1>

        <section className="mt-4 space-y-4">
          <p className="text-lg sm:text-xl">{product?.price} TL</p>
          <p className="text-base text-gray-400">{product?.desc}</p>
        </section>
      </div>

      {/* Product image */}
      <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
        <img
          alt={product?.name}
          src={product?.image}
          className="aspect-square w-full rounded-lg object-cover"
        />
      </div>
      <div></div>
    </Container>
  );
}
