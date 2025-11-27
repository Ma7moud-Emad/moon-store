import { useSelector } from "react-redux";

import EmptyBox from "../../../components/ui/EmptyBox";
import useGetCart from "../hooks/useGetCart";
import Loading from "./../../../components/ui/Loading";
import CartItem, { Table, TotalCartPrice } from "./CartItem";
import ErrorMsg from "../../../components/ui/ErrorMsg";

export default function CartBox() {
  const token = useSelector((state) => state.user.token);
  const { data, isPending, error } = useGetCart(token);

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMsg msg={error.response.data.message} />;
  }
  return (
    <div className="pt-16 sm:pt-32 mb-16 sm:mb-4">
      <h1 className="text-2xl font-semibold text-neutral-800 capitalize pl-2.5">
        my cart
      </h1>
      <p className="text-neutral-800 mb-4 pl-2.5">
        There are{" "}
        <span className="text-light-brown">{data.numOfCartItems}</span> products
        in this cart.
      </p>
      <div className="sm:mb-1 px-4 space-y-4 md:space-y-0">
        {data?.numOfCartItems === 0 ? (
          <EmptyBox
            title="Your cart is empty"
            description="You haven’t added any products to your cart yet, Browse products and add them to your cart for a quick checkout process."
            btnName="Start Shopping"
            navigation="products"
          />
        ) : (
          <>
            <Table items={data?.data?.products} />
            <TotalCartPrice
              totalPrice={data?.data.totalCartPrice}
              cartId={data?.cartId}
            />
            {data?.data?.products?.map((item) => (
              <CartItem key={item.product._id} item={item} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
