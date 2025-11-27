import { useSelector } from "react-redux";
import useWishlist from "../hooks/useGetWishlist";

import Loading from "../../../components/ui/Loading";
import WishlistItem from "./WishlistItem";
import EmptyBox from "../../../components/ui/EmptyBox";
import ErrorMsg from "../../../components/ui/ErrorMsg";

export default function Wishlist() {
  const token = useSelector((state) => state.user.token);

  const { data, isPending, error } = useWishlist(token);

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMsg msg={error.response.data.message} />;
  }

  return (
    <div className="py-16 sm:pt-32 sm:pb-0">
      <h1 className="text-2xl font-semibold text-neutral-800 capitalize pl-2.5">
        my Wishlist
      </h1>
      <p className="text-neutral-800 mb-4 pl-2.5">
        There are <span className="text-light-brown">{data.count}</span>{" "}
        products in this wishlist.
      </p>
      {data?.count === 0 ? (
        <EmptyBox
          title="Your wishlist is empty"
          description="You haven't added any products to your wishlist yet. Start browsing and save items for a quicker purchase later."
          btnName="Start Shopping"
          navigation="products"
        />
      ) : (
        <div className="sm:flex sm:flex-wrap">
          {data?.data?.map((item) => (
            <WishlistItem key={item._id} product={item} wishlist={data} />
          ))}
        </div>
      )}
    </div>
  );
}
