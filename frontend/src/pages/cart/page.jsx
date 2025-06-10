import Container from "../../components/ui/container";

import { useEffect, useState } from "react";
import { useCartStore } from "../../store/cart";
import { useAuthStore } from "../../store/auth";
import { toast, Toaster } from "sonner";
import Orders from "./_components/orders";

export default function Page() {
  const { cart, fetchCart, totalPrice, clearCart, removeFromCart } =
    useCartStore();

  const { user } = useAuthStore();

  const [showThanks, setShowThanks] = useState(false);

  useEffect(() => {
    if (user) fetchCart(user._id);
  }, [user]);

  // Delete All Product
  const handleDeleteAllCart = async () => {
    const { success, message } = await clearCart(user._id);

    if (!success) toast.error(message);
    else toast.success(message);
  };

  // Buy all Product
  const handleBuy = async () => {
    const { success, message } = await clearCart(user._id);

    if (!success) toast.error(message);
    else {
      setShowThanks(true);
      toast.success("Products Successfully Purchased");
    }
  };

  // Delete By Product
  const handleDelete = async (productId) => {
    const { success, message } = await removeFromCart({
      userId: user._id,
      productId,
    });

    if (!success) toast.error(message);
    else {
      await fetchCart(user._id);
      toast.success(message);
    }
  };

  return (
    <Container>
      <Toaster position="bottom-center" />

      {showThanks ? (
        <div className="mx-auto max-w-2xl flex flex-col space-y-4 text-xl text-center">
          <h3 className="text-2xl font-semibold text-primary">Thank you!</h3>
          <h2>Your purchase has been completed.</h2>
          <p>We hope you enjoy your product!</p>
        </div>
      ) : cart.length === 0 ? (
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Shopping Cart Empty
        </h2>
      ) : (
        <Orders
          cart={cart}
          handleDelete={handleDelete}
          handleDeleteAllCart={handleDeleteAllCart}
          handleBuy={handleBuy}
          totalPrice={totalPrice}
        />
      )}
    </Container>
  );
}
