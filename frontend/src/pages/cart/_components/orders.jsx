import Button from "../../../components/ui/button";

export default function Orders({
  cart,
  handleDelete,
  handleDeleteAllCart,
  handleBuy,
  totalPrice,
}) {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Shopping Cart
      </h1>

      <form className="mt-12">
        <section>
          <ul
            role="list"
            className="divide-y divide-gray-200 border-t border-b border-gray-200"
          >
            {cart.map((item) => (
              <li key={item._id} className="flex py-6">
                <div className="shrink-0">
                  <img
                    alt={item.name}
                    src={item.image}
                    className="size-24 rounded-md object-cover sm:size-32"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                  <div>
                    <div className="flex justify-between">
                      <h4 className="text-sm">{item.name}</h4>
                      <p className="ml-4 text-sm font-medium text-gray-900">
                        ${item.totalPrice}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.color}</p>
                    <p className="mt-1 text-sm text-gray-500">{item.size}</p>
                  </div>

                  <div className="mt-4 flex flex-1 items-end justify-between">
                    <p className="flex items-center space-x-2 text-sm text-gray-700">
                      <span>
                        {item.price}₺ x {item.quantity}
                      </span>
                    </p>
                    <div className="ml-4">
                      <Button
                        type="button"
                        className="text-sm font-medium text-primary px-0"
                        onClick={() => handleDelete(item._id)}
                      >
                        <span>Remove</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Order summary */}
        <section className="mt-10">
          <div>
            <dl className="space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-base font-medium text-gray-900">Total</dt>
                <dd className="ml-4 text-base font-medium text-gray-900">
                  ${totalPrice}
                </dd>
              </div>
            </dl>
            <p className="mt-1 text-sm text-gray-500">
              Shipping and taxes are included in the price.
            </p>
          </div>

          <div className="mt-10 flex max-sm:flex-col items-center gap-2">
            <Button
              type="button"
              className="w-full rounded-md ring-1 ring-primary bg-foreground text-primary"
              onClick={handleDeleteAllCart}
            >
              Delete All Product
            </Button>
            <Button
              type="button"
              className="w-full rounded-md bg-primary text-white"
              onClick={handleBuy}
            >
              Buy
            </Button>
          </div>
        </section>
      </form>
    </div>
  );
}
