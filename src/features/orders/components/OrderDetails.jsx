export default function OrderDetails({ order }) {
  const { shippingAddress, cartItems, totalOrderPrice } = order;

  return (
    <div className="mb-6 bg-neutral-900/5 p-4 text-neutral-800">
      <div className="hidden sm:grid grid-cols-5 gap-4 items-center pb-2 font-semibold bg-light-brown text-neutral p-2">
        <span>Product</span>
        <span>Brand</span>
        <span>Qty</span>
        <span>Price</span>
        <span>Total</span>
      </div>
      {cartItems.map((item) => (
        <div
          key={item._id}
          className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center py-2 border-b border-neutral-600"
        >
          <div className="flex items-center gap-2">
            <img
              src={item.product.imageCover}
              alt={item.product.title}
              className="w-12 h-12 object-cover rounded"
            />
            <span className="font-semibold ">{item.product.title}</span>
          </div>
          <div className="hidden sm:block ">{item.product.brand.name}</div>
          <div className="hidden sm:block ">{item.count}</div>
          <div className="hidden sm:block ">${item.price}</div>
          <div className="hidden sm:block ">${item.price * item.count}</div>

          {/* Mobile view */}
          <div className="sm:hidden mt-2 text-sm">
            <p>Brand: {item.product.brand.name}</p>
            <p>Qty: {item.count}</p>
            <p>Price: ${item.price}</p>
            <p>Total: ${item.price * item.count}</p>
          </div>
        </div>
      ))}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2">
        <div>
          <h2 className="font-semibold text-lg mb-1 ">Shipping Address</h2>
          <p>Details: {shippingAddress?.details}</p>
          <p>City: {shippingAddress?.city}</p>
          <p>Phone: {shippingAddress?.phone}</p>
        </div>
      </div>

      {/* Total */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 items-center bg-light-brown text-neutral p-2">
        <div className="col-span-1 font-semibold">Total Price</div>
        <div className="col-span-1 font-semibold">${totalOrderPrice}</div>
      </div>
    </div>
  );
}
